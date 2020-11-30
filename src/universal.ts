/**
 * @file App universal helper
 * @module app/universal-helper
 * @author Surmon <https://github.com/surmon-china>
 */

import { onBeforeMount, getCurrentInstance } from 'vue'
import { promise } from '/@/services/cache'
import { GlobalRawState, useGlobalState } from '/@/state'
import { Theme } from '/@/services/theme'
import { isServer, isClient, isSPA } from '/@/environment'

// store script
export const getSSRStoreScript = (data: string) => {
  return `window.__INITIAL_STATE__ = ${data}`
}
export const getSSRStoreData = () => {
  return (window as any).__INITIAL_STATE__
}

// context script
export interface SSRContext {
  url: string
  theme: Theme
  globalState: GlobalRawState
}
export const getSSRContextScript = (data: string) => {
  return `window.__INITIAL_SSR_CONTEXT__ = ${data}`
}
export const getSSRContextData = (): SSRContext => {
  return (window as any).__INITIAL_SSR_CONTEXT__
}

// env only
export const onClient = (callback: any) => {
  isClient && callback()
}
export const onServer = (callback: any) => {
  isServer && callback()
}

// server pre fetch
export const onPrefetch = <D = any>(fetcher: () => Promise<any>, data: D) => {
  if (isSPA) {
    onBeforeMount(fetcher)
    return data
  }
  // SSR -> Server
  if (isServer) {
    return fetcher().then(() => data)
  }
  // SSR -> Client
  // TODO: _hydrating
  // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
  // isHydrating: https://github.com/vuejs/vue-next/issues/1723
  // isHydrating: https://github.com/vuejs/vue-next/pull/2016
  // console.log('-----context', getCurrentInstance())
  // if (getCurrentInstance()?._hydrating)

  if (useGlobalState().isHydrated) {
    onBeforeMount(fetcher)
  }

  return data
}
