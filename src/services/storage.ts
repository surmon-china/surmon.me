/**
 * @file 本机数据状态
 * @module services/storage
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, watchEffect } from 'vue'

export const get = (key: string) => localStorage.getItem(key)
export const set = (key: string, data: string) => localStorage.setItem(key, data)
export const remove = (key: string) => localStorage.removeItem(key)

export const setJSON = (key: string, data: any) => set(key, JSON.stringify(data))
export const getJSON = <T = any>(key: string): T | null => {
  const data = get(key)
  return typeof data === 'string' ? JSON.parse(data) : null
}

export const getAccesser = <S = any>(key: string, initState: S) => {
  const localState = ref(getJSON<S>(key) || initState)
  watchEffect(() => setJSON(key, localState.value))
  return localState
}

export default {
  get,
  set,
  remove,
  setJSON,
  getJSON,
  getAccesser
}
