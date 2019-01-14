/**
 * @file 本机数据状态 / ES module
 * @module transforms/local-storage
 * @author Surmon <https://github.com/surmon-china>
 */

import systemConstants from '~/constants/system'

export const get = key => localStorage.getItem(key)
export const del = key => localStorage.removeItem(key)
export const set = (key, data) => localStorage.setItem(key, data)

export const buildStorageReader = key => ({
  get() {
    const data = get(key)
    return data ? JSON.parse(data) : null
  },
  remove: () => del(key),
  set: data => set(key, JSON.stringify(data))
})

export const localUser = buildStorageReader(systemConstants.StorageField.User)
export const localHistoryLikes = buildStorageReader(systemConstants.StorageField.UserLikeHistory)
