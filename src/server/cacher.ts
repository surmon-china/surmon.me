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

const retryStateMap = new Map<string, boolean>()
const retry = (config: CacherConfig) => {
  if (bffCache.has(config.key)) {
    retryStateMap.set(config.key, false)
    return
  }

  config
    .getter()
    .then((d) => {
      bffCache.set(config.key, d, config.age * 1000)
    })
    .catch((e) => {
      console.warn('[cacher] retry error:', e)
    })
    .finally(() => {
      retryStateMap.set(config.key, false)
    })
}

export const cacher = async (config: CacherConfig) => {
  // cached
  if (bffCache.has(config.key)) {
    return bffCache.get(config.key)
  }

  try {
    const data = await config.getter()
    bffCache.set(config.key, data, config.age * 1000)
    return data
  } catch (error: any) {
    // retry only once
    if (config.retryWhen && !retryStateMap.get(config.key)) {
      retryStateMap.set(config.key, true)
      setTimeout(() => retry({ ...config }), config.retryWhen * 1000)
    }
    const err = typeof error === 'string' ? new Error(error) : error
    err.name = `[cacher] ${err.name || ''}`
    return Promise.reject(err)
  }
}
