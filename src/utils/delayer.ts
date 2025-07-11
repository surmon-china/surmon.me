/**
 * @file delay simulator
 * @module util/delayer
 * @author Surmon <https://github.com/surmon-china>
 */

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const delayPromise = <T>(ms: number, promise: Promise<T>): Promise<T> => {
  return Promise.all([promise, delay(ms)]).then(([result]) => result)
}
