/**
 * @file App universal prefetch
 * @module app/universal/prefetch
 * @author Surmon <https://github.com/surmon-china>
 */

import { onBeforeMount, getCurrentInstance, ComponentOptions } from 'vue'
import { useGlobalState } from '/@/app/state'
import { isServer, isSPA } from '/@/app/environment'

// https://github.com/nuxt/framework/blob/main/packages/nuxt3/src/app/composables/asyncData.ts

// serverPrefetch === async setup
// serverPrefetch && async setup = not handle error
// https://github.com/vuejs/vue-next/blob/master/packages/server-renderer/src/render.ts#L96
/**
 * prefetch(() => Promise<>, data)
 * async setup =>
 *  fetch()
 *    .then(() => data)
 *    .catch(error => setError(error) && return data)
 */

// server pre fetch
export const prefetch = <D = any>(fetcher: () => Promise<any>, data: D) => {
  const globalState = useGlobalState()
  const doFetchOnBeforeMount = () => {
    onBeforeMount(() => {
      fetcher().catch((error) => {
        globalState.setRenderError(error)
        return Promise.reject(error)
      })
    })
  }

  // SPA
  if (isSPA) {
    doFetchOnBeforeMount()
    return data
  }

  // SSR -> Server
  if (isServer) {
    return fetcher()
      .then(() => data)
      .catch((error) => {
        globalState.setRenderError(error)
        return data
      })
  }

  // SSR -> Client
  // TODO: _hydrating
  // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
  // isHydrating: https://github.com/vuejs/vue-next/issues/1723
  // isHydrating: https://github.com/vuejs/vue-next/pull/2016
  // https://github.com/nuxt-community/composition-api/blob/main/src/fetch.ts#L242
  // if (getCurrentInstance()?._hydrating)
  if (globalState.isHydrated.value) {
    doFetchOnBeforeMount()
  }
  return data
}

// MARK: 不可用
export const usePrefetch = (fetcher: () => Promise<any>) => {
  const instance = getCurrentInstance()
  // https://github.com/vuejs/vue-next/blob/master/packages/server-renderer/src/render.ts#L88
  // https://github.com/nuxt-community/composition-api/blob/main/src/fetch.ts#L226
  ;(instance?.vnode.type as ComponentOptions).serverPrefetch = fetcher
}
