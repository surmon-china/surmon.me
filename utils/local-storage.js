/**
 * @file 本机数据状态 / ES module
 * @module utils/local-storage
 * @author Surmon <https://github.com/surmon-china>
 */

const getData = key => localStorage.getItem(key)
const delData = key => localStorage.removeItem(key)
const setData = (key, data) => localStorage.setItem(key, data)

export const localUser = {
  get() {
    const user = getData('user')
    return user ? JSON.parse(user) : null
  },
  remove: () => delData('user'),
  set: user => setData('user', JSON.stringify(user))
}

export const localHistoryLikes = {
  get() {
    const historyLikes = getData('user_like_history')
    return historyLikes ? JSON.parse(historyLikes) : null
  },
  remove: () => delData('user_like_history'),
  set: data => setData('user_like_history', JSON.stringify(data))
}
