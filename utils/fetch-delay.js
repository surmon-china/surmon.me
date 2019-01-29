/**
 * @file 模拟延时器 / ES module
 * @module utils/fetch-delay
 * @author Surmon <https://github.com/surmon-china>
 */

import appConfig from '~/config/app.config'
import { isBrowser } from '~/environment/esm'

// 恢复默认
export const fetchDelay = delay => {
  
  // 一个卑鄙的手段
  delay = delay != null ? delay : appConfig.fetch.delay
  const start = new Date().getTime()

  return action => {

    // 卑鄙手段
    const end = new Date().getTime()
    const time = end - start
    const timeout = delay - time
    const isDelay = isBrowser && timeout > 0
    isDelay
      ? setTimeout(action, timeout)
      : action()
  }
}
