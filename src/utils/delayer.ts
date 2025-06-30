/**
 * @file delay simulator
 * @module util/delayer
 * @author Surmon <https://github.com/surmon-china>
 */

import { APP_CONFIG } from '/@/configs/app.config'

export const delayer = (ms: number = APP_CONFIG.article_fake_render_delay) => {
  const start = new Date().getTime()
  return (action: () => void) => {
    if (!ms) {
      action()
      return
    }

    const time = new Date().getTime() - start
    const timeout = ms - time
    const isDelay = timeout > 0
    isDelay ? setTimeout(action, timeout) : action()
  }
}

/**
 * @example
 * ```ts
 *  delayPromise(600, promise).then(...)
 * ```
 */
export const delayPromise = <T>(ms: number, promise: Promise<T>) => {
  const delay = delayer(ms)
  return new Promise<T>((resolve, reject) => {
    promise.then((value) => delay(() => resolve(value))).catch(reject)
  })
}
