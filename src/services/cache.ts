/**
 * @file Storage cache
 * @module service.cache
 * @author Surmon <https://github.com/surmon-china>
 */

import * as storage from './storage'

// 获取器
export type CacheKey = string
export type CachePromiseResult<T> = Promise<T>

// IO 模式通用返回结构
export interface CacheIOResult<T> {
  get(): CachePromiseResult<T>
  update(): CachePromiseResult<T>
}

// Promise 模式参数
export interface CachePromiseOption<T> {
  key: CacheKey
  ttl?: number
  promise(): CachePromiseResult<T>
}
// Promise & IO 模式参数
export interface CachePromiseIOOption<T> extends CachePromiseOption<T> {
  ioMode?: boolean
}

interface CacheTimeStamp {
  last: number
  ttl: number
}

const getCacheKey = (key: CacheKey): string => {
  return `__cache__${key}`
}
const getCacheTimeStampKey = (key: CacheKey): string => {
  return `__cache__${key}_timestamp`
}

const getNowTime = (): number => {
  return Date.parse(new Date().toString())
}

/**
 * @description 承载缓存服务
 * @example CacheService.get(CacheKey)
 * @example CacheService.set(CacheKey)
 * @example CacheService.promise({ option })()
 * @example CacheService.interval({ option })()
 */
export const get = (key: CacheKey) => {
  const cacheKey = getCacheKey(key)
  const timeStampKey = getCacheTimeStampKey(key)
  const data = storage.getJSON(cacheKey) as $TODO
  const timeStamp = storage.getJSON(timeStampKey) as never as CacheTimeStamp
  const { last, ttl } = timeStamp || {}
  if (ttl == null || last == null) {
    return data
  }
  const dead = last + ttl < getNowTime()
  if (!dead) {
    return data
  }
  storage.remove(cacheKey)
  storage.remove(timeStampKey)
  return null
}

export const set = (key: CacheKey, value: any, ttl?: number): void => {
  storage.setJSON(getCacheKey(key), value)
  storage.setJSON(getCacheTimeStampKey(key), {
    last: getNowTime(),
    ttl
  })
}

/**
 * @function promise
 * @description 被动更新 | 双向同步 模式，Promise -> Redis
 * @example CacheService.promise({ key: CacheKey, promise() }) -> promise()
 * @example CacheService.promise({ key: CacheKey, promise(), ioMode: true }) -> { get: promise(), update: promise() }
 */
export function promise<T = $TODO>(options: CachePromiseOption<T>): CachePromiseResult<T>
export function promise<T = $TODO>(options: CachePromiseIOOption<T>): CacheIOResult<T>
export function promise(options: $TODO) {
  const { key, promise, ttl, ioMode = false } = options

  // 包装任务
  const doPromiseTask = () => {
    return promise().then((data: $TODO) => {
      set(key, data, ttl)
      return data
    })
  }

  // Promise 拦截模式（返回死数据）
  const handlePromiseMode = () => {
    const data = get(key)
    return data !== null && data !== undefined ? Promise.resolve(data) : doPromiseTask()
  }

  // 双向同步模式（返回获取器和更新器）
  const handleIoMode = () => ({
    get: handlePromiseMode,
    update: doPromiseTask
  })

  return ioMode ? handleIoMode() : handlePromiseMode()
}
