/**
 * @file BFF Server cacher
 * @module server.helper.cacher
 * @author Surmon <https://github.com/surmon-china>
 */

import crypto from 'crypto'
import type { CacheClient, Seconds } from '../services/cache'
import { getErrorMessage } from './responser'
import { createLogger } from '@/utils/logger'

export const logger = createLogger('BFF:Cacher')

export const minutes = (m: number): Seconds => m * 60
export const hours = (h: number): Seconds => h * minutes(60)
export const days = (d: number): Seconds => d * hours(24)

const humanizeSeconds = (s: number): string => {
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  const formattedHours = hours > 0 ? `${hours}h ` : ''
  const formattedMinutes = minutes > 0 ? `${minutes}m ` : ''
  const formattedSeconds = seconds > 0 ? `${seconds}s` : ''
  return formattedHours + formattedMinutes + formattedSeconds
}

export interface CacherOptions<T> {
  key: string
  ttl: Seconds
  getter(): Promise<T>
}

const getCacheKey = (key: string): string => `bff:${key}`
const getLockCacheKey = (key: string): string => `bff:interval-lock:${key}`

/** Execute the getter and store the data into the cache. */
const execute = async <T>(cache: CacheClient, options: CacherOptions<T>) => {
  const data = await options.getter()
  await cache.set(options.key, data, options.ttl)
  return data
}

const passive = async <T = any>(cache: CacheClient, opts: CacherOptions<T>): Promise<T> => {
  const options = { ...opts, key: getCacheKey(opts.key) }
  if (await cache.has(options.key)) {
    return await cache.get<T>(options.key)
  }

  try {
    const result = await execute(cache, options)
    logger.success('passive succeed:', `"${opts.key}" | ttl: ${humanizeSeconds(options.ttl)}`)
    return result
  } catch (error) {
    logger.failure(
      'passive failure:',
      `"${opts.key}"`,
      `| ttl: ${humanizeSeconds(options.ttl)}`,
      `| "${getErrorMessage(error)}"`
    )
    return Promise.reject(error)
  }
}

// Unique ID for interval task lock
const UNIQUE_INTERVAL_LOCK_ID = crypto.randomBytes(8).toString('hex')
// logger.debug('UNIQUE_INTERVAL_LOCK_ID:', UNIQUE_INTERVAL_LOCK_ID)

export interface IntervalCacherOptions<T> extends CacherOptions<T> {
  interval: Seconds
  retry: Seconds
}

const interval = <T>(cache: CacheClient, opts: IntervalCacherOptions<T>) => {
  const options = { ...opts, key: getCacheKey(opts.key) }
  const intervalLockKey = getLockCacheKey(opts.key)

  // In normal mode: the only instance performs the interval task.
  // In cluster mode: only one instance performs the interval task at the same time.
  const execInterval = async (succeedCount = 0, failureCount = 0) => {
    // 1. Acquire locks before executing tasks to determine execution privileges.
    const lock = await cache.get<string>(intervalLockKey)
    const executable = !lock || lock === UNIQUE_INTERVAL_LOCK_ID
    // logger.debug('execInterval', { lock, executable, intervalLockKey })

    try {
      // 2. Execute the task only in the (no lock) (self-locking) cases.
      if (executable) {
        // Temporarily set permanent survival for locks to prevent them from expiring during task execution.
        await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID)
        await execute(cache, options)
        // Incrementing the value of the count
        ++succeedCount
        logger.success(
          'interval succeed:',
          `${failureCount}/${succeedCount}`,
          `| "${opts.key}"`,
          `| ttl: ${humanizeSeconds(options.ttl)}`,
          `| next: ${humanizeSeconds(options.interval)}`
        )
        // After the task succeeds, update the lock's lifecycle to be consistent with the interval of the task.
        // Since JavaScript timeout is subject to uncertainty, allow some time for fault tolerance.
        await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID, options.interval + 2)
      } else {
        // 3. If the current task is already occupied by another instance, skip it
        // logger.debug('interval skip:', `"${opts.key}"`, `| lock: "${lock}"`)
      }

      // Regardless of whether the task is actually performed or not,
      // the timing check is performed again after an interval of time.
      // logger.debug('new interval:', `"${opts.key}"`, options.interval)
      setTimeout(() => execInterval(succeedCount, failureCount), options.interval * 1000)
    } catch (error) {
      // Incrementing the value of the count
      ++failureCount
      logger.failure(
        'interval failure:',
        `${failureCount}/${succeedCount}`,
        `| "${opts.key}"`,
        `| retry: ${humanizeSeconds(options.retry)}`,
        `| "${getErrorMessage(error)}"`
      )
      // If the task execution fails, the timing check will be executed again after the retry time.
      setTimeout(() => execInterval(succeedCount, failureCount), options.retry * 1000)
      // It should also update the lock's lifecycle to be consistent with the time of the retry.
      await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID, options.retry + 2)
    }
  }

  // Immediate execution of interval task
  execInterval()

  // Always only get data from the cache
  return async () => {
    if (await cache.has(options.key)) {
      return await cache.get<T>(options.key)
    } else {
      throw `No cached data for "${opts.key}".`
    }
  }
}

export default {
  passive,
  interval
}
