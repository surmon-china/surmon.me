/**
 * @file Universal Server cache
 * @module server.cache
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'
import { createClient } from 'redis'
import { META } from '@/config/app.config'

export interface CacheClient {
  set(
    key: string,
    value: any,
    /** cache age [seconds] */
    maxAge?: number
  ): Promise<void>
  get<T = any>(key: string): Promise<T>
  has(key: string): Promise<boolean>
  delete(key: string): Promise<any>
  clear(): Promise<void>
}

const getLRUClient = (): CacheClient => {
  // https://github.com/isaacs/node-lru-cache
  const lruCache = new LRU({
    max: Infinity,
    maxAge: -1 // MARK: default never expire
  })

  return {
    set: (key: string, value: any, maxAge?: number) => {
      return maxAge ? lruCache.set(key, value, maxAge * 1000) : lruCache.set(key, value)
    },
    get: (key) => lruCache.get(key),
    has: (key) => lruCache.has(key),
    delete: (key) => lruCache.del(key),
    clear: () => lruCache.reset()
  }
}

const getRedisClient = async (): Promise<CacheClient> => {
  // https://github.com/redis/node-redis
  const client = createClient({
    socket: {
      // Only once connect! Redis error > reject
      reconnectStrategy: () => new Error(`can't connect to Redis!`)
    }
  })
  client.on('connect', () => console.info('[redis]', 'connecting...'))
  client.on('reconnecting', () => console.info('[redis]', 'reconnecting...'))
  client.on('ready', () => console.info('[redis]', 'readied!'))
  client.on('error', (error) => console.warn('[redis]', 'Client Error!', error.message || error))
  await client.connect()

  const getCacheKey = (key: string) => {
    const cacheKeyPrefix = META.domain.replace(/\./gi, '_')
    return `__${cacheKeyPrefix}_${key}`
  }

  const set: CacheClient['set'] = async (key, value, maxAge) => {
    const _value = value ? JSON.stringify(value) : ''
    if (maxAge) {
      // https://redis.io/commands/setex
      await client.setEx(getCacheKey(key), maxAge, _value)
    } else {
      await client.set(getCacheKey(key), _value)
    }
  }

  const get: CacheClient['get'] = async (key) => {
    const value = await client.get(getCacheKey(key))
    return value ? JSON.parse(value) : value
  }

  const has: CacheClient['has'] = async (key) => {
    const value = await client.exists(getCacheKey(key))
    return Boolean(value)
  }

  const del: CacheClient['delete'] = (key) => client.del(getCacheKey(key))

  const clear: CacheClient['clear'] = async () => {
    const keys = await client.keys(getCacheKey('*'))
    if (keys.length) {
      await client.del(keys)
    }
  }

  return {
    set,
    get,
    has,
    delete: del,
    clear
  }
}

export const initCacheClient = async () => {
  let cacheClient: CacheClient | null = null
  try {
    cacheClient = await getRedisClient()
    console.info('[cache]', 'Redis store readied!')
  } catch (error) {
    cacheClient = getLRUClient()
    console.info('[cache]', 'LRU store readied!')
  }
  await cacheClient.clear()
  return cacheClient
}
