/**
 * @file 模拟延时器
 * @module util/fetch-delay
 * @author Surmon <https://github.com/surmon-china>
 */

import { DEFAULT_FETCH_DELAY } from '/@/config/app.config'

export const fetchDelay = (delay: number = DEFAULT_FETCH_DELAY) => {
  // 一个卑鄙的手段
  const start = new Date().getTime()
  return (action: $TODO) => {
    // 卑鄙手段
    const end = new Date().getTime()
    const time = end - start
    const timeout = delay - time
    const isDelay = timeout > 0
    isDelay ? window.setTimeout(action, timeout) : action()
  }
}
