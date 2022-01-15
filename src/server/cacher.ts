/**
 * @file BFF Server cacher
 * @module server.cacher
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'

const bffCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 60 * 2 // 2 hour cache
})

export interface CacherConfig {
  getter: () => Promise<any>
  /** cache key */
  key: string
  /** cache age [seconds] */
  age: number
  /** retry when after [seconds] */
  retryWhen?: number
}

const retryingMap = new Map<string, boolean>()
const retry = (config: CacherConfig) => {
  if (bffCache.has(config.key)) {
    retryingMap.set(config.key, false)
    return
  }

  config
    .getter()
    .then((data) => {
      bffCache.set(config.key, data, config.age * 1000)
    })
    .catch((error) => {
      console.warn('[cacher] retry error:', error)
    })
    .finally(() => {
      retryingMap.set(config.key, false)
    })
}

export const cacher = async (config: CacherConfig) => {
  // cached
  if (bffCache.has(config.key)) {
    return bffCache.get(config.key)
  }

  // fetch & cache
  const fetchAndCache = async (_config: CacherConfig) => {
    const data = await _config.getter()
    bffCache.set(_config.key, data, _config.age * 1000)
    return data
  }

  // timeout prefetch
  const setTimeoutPreRefresh = (_config: CacherConfig, preSeconds: number, refreshCount = 1) => {
    const whenSeconds = _config.age - preSeconds
    console.info(
      '[cacher] setTimeoutPreRefresh',
      `> ${_config.key} + ${refreshCount}`,
      `> cache expire when after ${_config.age}s`,
      `> pre refresh when after ${whenSeconds}s`
    )
    setTimeout(() => {
      fetchAndCache(_config)
        .then(() => {
          setTimeoutPreRefresh(_config, preSeconds, refreshCount + 1)
        })
        .catch((error) => {
          console.warn(
            `[cacher] setTimeoutPreRefresh ERROR!`,
            `> ${_config.key} + ${refreshCount}`,
            error
          )
        })
    }, whenSeconds * 1000)
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
      setTimeout(() => retry({ ...config }), config.retryWhen * 1000)
    }

    if (typeof error === 'string') {
      return Promise.reject(`cacher error > ${error}`)
    }

    const err = (error as any).toJSON?.() || error
    err.name = `cacher error > ${err.name || ''}`
    return Promise.reject(err)
  }
}
