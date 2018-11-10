/**
 * @file 本机数据状态 / ES module
 * @module utils/local-storage
 * @author Surmon <https://github.com/surmon-china>
 */

export const get = key => localStorage.getItem(key)
export const del = key => localStorage.removeItem(key)
export const set = (key, data) => localStorage.setItem(key, data)

export const localUser = {
  get() {
    const user = get('user')
    return user ? JSON.parse(user) : null
  },
  remove: () => del('user'),
  set: user => set('user', JSON.stringify(user))
}

export const localHistoryLikes = {
  get() {
    const historyLikes = get('user_like_history')
    return historyLikes ? JSON.parse(historyLikes) : null
  },
  remove: () => del('user_like_history'),
  set: data => set('user_like_history', JSON.stringify(data))
}
