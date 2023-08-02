/**
 * @file BFF Server cacher
 * @module server.helper.cacher
 * @author Surmon <https://github.com/surmon-china>
 */

import type { CacheClient, Seconds } from '../cache'

export interface CacherConfig {
  cache: CacheClient
  key: string
  /** in seconds */
  ttl: Seconds
  /** retry when after [seconds] */
  retryWhen?: Seconds
  /** if `true`, this data will never expire. default: `true` */
  preRefresh?: boolean
  getter: () => Promise<any>
}

// fetch & cache
const fetchAndCache = async (config: CacherConfig) => {
  const data = await config.getter()
  await config.cache.set(config.key, data, config.ttl)
  return data
}

// timeout prefetch
const setTimeoutPreRefresh = (config: CacherConfig, preSeconds: number, refreshCount = 1) => {
  const timeoutSeconds = config.ttl - preSeconds
  console.info(
    '[cacher] setTimeoutPreRefresh',
    `> ${config.key} + ${refreshCount}`,
    `> cache expire when after ${config.ttl}s`,
    `> pre refresh when after ${timeoutSeconds}s`
  )

  setTimeout(async () => {
    try {
      await fetchAndCache(config)
      setTimeoutPreRefresh(config, preSeconds, refreshCount + 1)
    } catch (error) {
      console.warn(`[cacher] setTimeoutPreRefresh error:`, `> ${config.key} + ${refreshCount}`, error)
    }
  }, timeoutSeconds * 1000)
}

const retryingMap = new Map<string, boolean>()
const retryFetch = async (config: CacherConfig) => {
  if (await config.cache.has(config.key)) {
    retryingMap.set(config.key, false)
    return
  }

  try {
    await fetchAndCache(config)
  } catch (error) {
    console.warn('[cacher] retryFetch error:', error)
  } finally {
    retryingMap.set(config.key, false)
  }
}

export const cacher = async <T = any>(configInput: CacherConfig): Promise<T> => {
  // key prefix
  const config: CacherConfig = { ...configInput, key: `bff_${configInput.key}` }

  // cached
  if (await config.cache.has(config.key)) {
    return await config.cache.get<T>(config.key)
  }

  try {
    // 1. fetch & cache
    const data = await fetchAndCache(config)
    // 2. refresh 1 minute before ttl expires to get the latest data,
    // This behavior is performed recursively and causes the data to never expire.
    if (config.preRefresh !== false) {
      setTimeoutPreRefresh(config, 60)
    }
    // 3. return data
    return data
  } catch (error: unknown) {
    // retry only once
    if (config.retryWhen && !retryingMap.get(config.key)) {
      retryingMap.set(config.key, true)
      setTimeout(() => retryFetch({ ...config }), config.retryWhen * 1000)
    }
    // return error
    throw error
  }
}
