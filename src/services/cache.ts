/**
 * @file Cache 缓存模块服务
 * @module service/cache
 * @author Surmon <https://github.com/surmon-china>
 */

import * as storage from './storage'

// 获取器
export type TCacheKey = string
export type TCachePromiseResult<T> = Promise<T>

// IO 模式通用返回结构
export interface ICacheIoResult<T> {
  get(): TCachePromiseResult<T>
  update(): TCachePromiseResult<T>
}

// Promise 模式参数
export interface ICachePromiseOption<T> {
  key: TCacheKey
  ttl?: number
  promise(): TCachePromiseResult<T>
}
// Promise & IO 模式参数
export interface ICachePromiseIOOption<T> extends ICachePromiseOption<T> {
  ioMode?: boolean
}

interface ICacheTimeStamp {
  last: number
  ttl: number
}

function getCacheKey(key: TCacheKey): string {
  return `__cache__${key}`
}

function getCacheTimeStampKey(key: TCacheKey): string {
  return `__cache__${key}_timestamp`
}

function getNowTime(): number {
  return Date.parse(new Date().toString())
}

/**
 * @class CacheService
 * @classdesc 承载缓存服务
 * @example CacheService.get(CacheKey)
 * @example CacheService.set(CacheKey)
 * @example CacheService.promise({ option })()
 * @example CacheService.interval({ option })()
 */
export function get(key: TCacheKey) {
  const cacheKey = getCacheKey(key)
  const timeStampKey = getCacheTimeStampKey(key)
  const data = storage.getJSON(cacheKey) as $TODO
  const timeStamp = storage.getJSON(timeStampKey) as never as ICacheTimeStamp
  const { last, ttl } = timeStamp || {}
  if (ttl == null || last == null) {
    return data
  }
  const dead = (last + ttl) < getNowTime()
  if (!dead) {
    return data
  }
  storage.remove(cacheKey)
  storage.remove(timeStampKey)
  return null
}

export function set(key: TCacheKey, value: any, ttl?: number): void {
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
export function promise<T = $TODO>(options: ICachePromiseOption<T>): TCachePromiseResult<T>
export function promise<T = $TODO>(options: ICachePromiseIOOption<T>): ICacheIoResult<T>
export function promise(options: $TODO) {
  const {
    key,
    promise,
    ttl,
    ioMode = false
  } = options

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
    return data !== null && data !== undefined
      ? Promise.resolve(data)
      : doPromiseTask()
  }

  // 双向同步模式（返回获取器和更新器）
  const handleIoMode = () => ({
    get: handlePromiseMode,
    update: doPromiseTask
  })

  return ioMode ? handleIoMode() : handlePromiseMode()
}
