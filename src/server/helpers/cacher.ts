/**
 * @file BFF Server cacher
 * @module server.cacher
 * @author Surmon <https://github.com/surmon-china>
 */

import type { CacheClient } from '../cache'

export interface CacherConfig {
  cache: CacheClient
  getter: () => Promise<any>
  /** cache key */
  key: string
  /** cache age [seconds] */
  age: number
  /** retry when after [seconds] */
  retryWhen?: number
}

// fetch & cache
const fetchAndCache = async (config: CacherConfig) => {
  const data = await config.getter()
  await config.cache.set(config.key, data, config.age)
  return data
}

// timeout prefetch
const setTimeoutPreRefresh = (config: CacherConfig, preSeconds: number, refreshCount = 1) => {
  const timeoutSeconds = config.age - preSeconds
  console.info(
    '[cacher] setTimeoutPreRefresh',
    `> ${config.key} + ${refreshCount}`,
    `> cache expire when after ${config.age}s`,
    `> pre refresh when after ${timeoutSeconds}s`
  )

  setTimeout(async () => {
    try {
      await fetchAndCache(config)
      setTimeoutPreRefresh(config, preSeconds, refreshCount + 1)
    } catch (error) {
      console.warn(
        `[cacher] setTimeoutPreRefresh ERROR!`,
        `> ${config.key} + ${refreshCount}`,
        error
      )
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
    console.warn('[cacher] retry error:', error)
  } finally {
    retryingMap.set(config.key, false)
  }
}

export const cacher = async (config: CacherConfig) => {
  // cached
  if (await config.cache.has(config.key)) {
    return await config.cache.get(config.key)
  }

  try {
    // 1. fetch & cache
    const data = await fetchAndCache(config)
    // 2. set timeout pre 1 min refresh
    setTimeoutPreRefresh(config, 60)
    // 3. return data
    return data
  } catch (error: any) {
    // retry only once
    if (config.retryWhen && !retryingMap.get(config.key)) {
      retryingMap.set(config.key, true)
      setTimeout(() => retryFetch({ ...config }), config.retryWhen * 1000)
    }

    if (typeof error === 'string') {
      return Promise.reject(`cacher error > ${error}`)
    }

    const err = (error as any).toJSON?.() || error
    err.name = `cacher error > ${err.name || ''}`
    return Promise.reject(err)
  }
}
