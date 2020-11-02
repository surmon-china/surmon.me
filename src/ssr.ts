import { onBeforeMount, getCurrentInstance } from 'vue'
import { isServer, isSPA } from '/@/environment'

export const getSSRStoreScript = (data) => {
  return `window.__INITIAL_STATE__ = ${JSON.stringify(data)}`
}
export const getSSRStoreData = () => {
  return (window as any).__INITIAL_STATE__
}

export const getSSRContextScript = (data) => {
  return `window.__INITIAL_SSR_CONTEXT__ = ${JSON.stringify(data)}`
}
export const getSSRContextData = () => {
  return (window as any).__INITIAL_SSR_CONTEXT__
}

// server pre fetch
let isFirstScreenHydrated = false
export const onPreFetch = <D = any>(fetcher: () => Promise<any>, data: D) => {
  if (isSPA) {
    onBeforeMount(fetcher)
    return data
  }
  // SSR -> Server
  if (isServer) {
    // TODO: 容错
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
