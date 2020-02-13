/**
 * @file 本机数据状态 / ES module
 * @module services/local-storage
 * @author Surmon <https://github.com/surmon-china>
 */

export const get = (key: string) => localStorage.getItem(key)
export const del = (key: string) => localStorage.removeItem(key)
export const set = (key: string, data: string) => localStorage.setItem(key, data)

export const getStorageReader = (key: string) => ({
  get: () => get(key),
  set: (data: string) => set(key, data),
  remove: () => del(key)
})

export const getJSONStorageReader = (key: string) => ({
  get(): object {
    const data = get(key)
    return data ? JSON.parse(data) : null
  },
  set(data: JSON | object) {
    set(key, JSON.stringify(data))
  },
  remove: () => del(key)
})
