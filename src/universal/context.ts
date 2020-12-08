/**
 * @file App universal context
 * @module app/universal/context
 * @author Surmon <https://github.com/surmon-china>
 */

import { GlobalRawState } from '/@/state'
import { Theme } from '/@/services/theme'

// store script
const SSR_STORE_STATE_KEY = '__INITIAL_STATE__'
export const getSSRStoreScript = (data: string) => {
  return `window.${SSR_STORE_STATE_KEY} = ${data}`
}
export const getSSRStoreData = () => {
  return (window as any)[SSR_STORE_STATE_KEY]
}

// context script
export interface SSRContext {
  url: string
  theme: Theme
  globalState: GlobalRawState
}
// https://github.com/nuxt-community/composition-api/blob/main/src/ssr-ref.ts#L38
const SSR_CONTEXT_KEY = '__INITIAL_SSR_CONTEXT__'
export const getSSRContextScript = (data: string) => {
  return `window.${SSR_CONTEXT_KEY} = ${data}`
}
export const getSSRContextData = (): SSRContext => {
  return (window as any)[SSR_CONTEXT_KEY]
}
