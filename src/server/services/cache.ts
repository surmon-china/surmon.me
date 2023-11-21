/**
 * @file Universal Server cache
 * @module server.service.cache
 * @author Surmon <https://github.com/surmon-china>
 */

import { LRUCache } from 'lru-cache'
import { createClient } from 'redis'
import { createLogger } from '@/utils/logger'

export const logger = createLogger('BFF:Cache')

export type Seconds = number

export interface CacheClient {
  set(key: string, value: any, ttl?: Seconds): Promise<void>
  get<T = any>(key: string): Promise<T>
  has(key: string): Promise<boolean>
  del(key: string): Promise<any>
  clear(): Promise<void>
}

const getLRUClient = (): CacheClient => {
  // https://github.com/isaacs/node-lru-cache
  const lruCache = new LRUCache<string, any>({ max: 500 })
  const set = async (key: string, value: any, ttl?: number) => {
    if (ttl) {
      await lruCache.set(key, value, { ttl: ttl * 1000 })
    } else {
      await lruCache.set(key, value)
    }
  }

  return {
    set,
    get: async (key) => lruCache.get(key),
    has: async (key) => lruCache.has(key),
    del: async (key) => lruCache.delete(key),
    clear: async () => lruCache.clear()
  }
}

const getRedisClient = async (options?: CacheClientOptions): Promise<CacheClient> => {
  // https://github.com/redis/node-redis
  const client = createClient()
  client.on('connect', () => logger.info('Redis connecting...'))
  client.on('reconnecting', () => logger.info('Redis reconnecting...'))
  client.on('ready', () => logger.success('Redis readied.'))
  client.on('error', (error) => logger.failure('Redis client error!', error.message || error))
  await client.connect()

  const getCacheKey = (key: string) => {
    const _namespace = options?.namespace ?? 'ssr_app'
    return `${_namespace}:${key}`
  }

  const set: CacheClient['set'] = async (key, value, ttl) => {
    const _value = value ? JSON.stringify(value) : ''
    if (ttl) {
      // EX — Set the specified expire time, in seconds.
      await client.set(getCacheKey(key), _value, { EX: ttl })
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

  const del: CacheClient['del'] = (key) => client.del(getCacheKey(key))

  const clear: CacheClient['clear'] = async () => {
    const keys = await client.keys(getCacheKey('*'))
    if (keys.length) {
      await client.del(keys)
    }
  }

  return { set, get, has, del, clear }
}

export interface CacheClientOptions {
  namespace?: string
}

export const createCacheClient = async (options?: CacheClientOptions) => {
  let cacheClient: CacheClient | null = null
  try {
    cacheClient = await getRedisClient(options)
    logger.info('Redis store readied.')
  } catch (error) {
    cacheClient = getLRUClient()
    logger.info('LRU store readied.')
  }
  await cacheClient.clear()
  return cacheClient
}
