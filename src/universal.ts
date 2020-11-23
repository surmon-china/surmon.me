/**
 * @file App universal helper
 * @module app/universal-helper
 * @author Surmon <https://github.com/surmon-china>
 */

import { onBeforeMount, getCurrentInstance } from 'vue'
import { promise } from '/@/services/cache'
import { isServer, isClient, isSPA } from '/@/environment'

// store script
export const getSSRStoreScript = (data) => {
  return `window.__INITIAL_STATE__ = ${data}`
}
export const getSSRStoreData = () => {
  return (window as any).__INITIAL_STATE__
}

// context script
export const getSSRContextScript = (data) => {
  return `window.__INITIAL_SSR_CONTEXT__ = ${data}`
}
export const getSSRContextData = () => {
  return (window as any).__INITIAL_SSR_CONTEXT__
}

// env only
export const onClient = (callback: any) => {
  isClient && callback()
}
export const onServer = (callback: any) => {
  isServer && callback()
}

// TODO:
// A Component -> onPrefetch
// B Component -> null
// SSR -> B -> Client -> A -> not fetch
// server pre fetch
let isFirstScreenHydrated = false
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
  // MARK:
  // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
  // isHydrating: https://github.com/vuejs/vue-next/issues/1723
  // isHydrating: https://github.com/vuejs/vue-next/pull/2016
  // TODO: _hydrating
  // console.log('-----context', getCurrentInstance())
  // if (getCurrentInstance()?._hydrating)
  if (!isFirstScreenHydrated) {
    isFirstScreenHydrated = true
  } else {
    onBeforeMount(fetcher)
  }
  return data
}
