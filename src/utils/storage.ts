/**
 * @file Local Storage
 * @module util.storage
 * @author Surmon <https://github.com/surmon-china>
 */

export const get = (key: string) => localStorage.getItem(key)
export const set = (key: string, data: string) => localStorage.setItem(key, data)
export const remove = (key: string) => localStorage.removeItem(key)

export const setJSON = (key: string, data: any) => set(key, JSON.stringify(data))
export const getJSON = <T = any>(key: string): T | null => {
  const data = get(key)
  return typeof data === 'string' ? JSON.parse(data) : null
}

export default {
  get,
  set,
  remove,
  setJSON,
  getJSON
}
