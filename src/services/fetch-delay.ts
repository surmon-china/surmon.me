/**
 * @file 模拟延时器 / ES module
 * @module services/fetch-delay
 * @author Surmon <https://github.com/surmon-china>
 */

import appConfig from '~/config/app.config'
import { isBrowser } from '~/environment'

export const fetchDelay = (delay: number) => {
  // 一个卑鄙的手段
  delay = delay != null ? delay : appConfig.fetch.delay
  const start = new Date().getTime()

  return (action: $TODO) => {
    // 卑鄙手段
    const end = new Date().getTime()
    const time = end - start
    const timeout = delay - time
    const isDelay = isBrowser && timeout > 0
    isDelay ? window.setTimeout(action, timeout) : action()
  }
}
