/**
 * @file 模拟延时器
 * @module util.delayer
 * @author Surmon <https://github.com/surmon-china>
 */

import { DEFAULT_DELAY } from '/@/config/app.config'

export const delayer = (delay: number = DEFAULT_DELAY) => {
  const start = new Date().getTime()
  return (action: () => void) => {
    if (!delay) {
      action()
      return
    }

    const end = new Date().getTime()
    const time = end - start
    const timeout = delay - time
    const isDelay = timeout > 0
    isDelay ? window.setTimeout(action, timeout) : action()
  }
}
