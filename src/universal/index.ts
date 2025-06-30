/**
 * @file App universal
 * @module universal
 * @author Surmon <https://github.com/surmon-china>
 */

import { isServer, isClient } from '/@/configs/app.env'
export * from './context'
export * from './prefetch'
export * from './hydration'

export const onClient = (callback: () => any) => {
  isClient && callback()
}

export const onServer = (callback: () => any) => {
  isServer && callback()
}
