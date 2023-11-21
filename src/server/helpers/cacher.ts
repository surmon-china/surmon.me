/**
 * @file BFF Server cacher
 * @module server.helper.cacher
 * @author Surmon <https://github.com/surmon-china>
 */

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
      `"${opts.key}" |`,
      `ttl: ${humanizeSeconds(options.ttl)} |`,
      `"${getErrorMessage(error)}"`
    )
    return Promise.reject(error)
  }
}

export interface IntervalCacherOptions<T> extends CacherOptions<T> {
  interval: Seconds
  retry: Seconds
}

const interval = <T>(cache: CacheClient, opts: IntervalCacherOptions<T>) => {
  const options = { ...opts, key: getCacheKey(opts.key) }
  const execInterval = async (refreshCount = 1) => {
    try {
      await execute(cache, options)
      setTimeout(() => execInterval(refreshCount + 1), options.interval * 1000)
      logger.success(
        'interval succeed:',
        `${refreshCount}+ "${opts.key}" |`,
        `ttl: ${humanizeSeconds(options.ttl)} |`,
        `next: ${humanizeSeconds(options.interval)}`
      )
    } catch (error) {
      setTimeout(() => execInterval(refreshCount + 1), options.retry * 1000)
      logger.failure(
        'interval failure:',
        `${refreshCount}+ "${opts.key}" |`,
        `retry: ${humanizeSeconds(options.retry)} |`,
        `"${getErrorMessage(error)}"`
      )
    }
  }

  execInterval()
  return async () => {
    if (await cache.has(options.key)) {
      return await cache.get(options.key)
    } else {
      throw `No cached data for "${opts.key}".`
    }
  }
}

export default {
  passive,
  interval
}
