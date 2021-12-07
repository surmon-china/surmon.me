/**
 * @file App universal prefetch
 * @module universal.prefetch
 * @author Surmon <https://github.com/surmon-china>
 */

import { onBeforeMount, onServerPrefetch } from 'vue'
import { useGlobalState } from '/@/app/state'
import { isServer, isSPA } from '/@/app/environment'

// onServerPrefetch === async setup
// onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
// https://github.com/vuejs/vue-next/blob/master/packages/server-renderer/src/render.ts#L96
// https://github.com/nuxt-community/composition-api/blob/main/src/fetch.ts#L226
// https://github.com/nuxt/framework/blob/main/packages/nuxt3/src/app/composables/asyncData.ts
// https://github.com/nuxt-community/composition-api/blob/main/src/runtime/composables/async.ts
export const useUniversalFetch = (fetcher: () => Promise<any>) => {
  const globalState = useGlobalState()
  const doFetchOnBeforeMount = () => {
    onBeforeMount(() => fetcher())
  }

  // Client side: SPA
  if (isSPA) {
    doFetchOnBeforeMount()
    return
  }

  // Server side: SSR
  if (isServer) {
    onServerPrefetch(() =>
      fetcher().catch((error) => {
        // HACK: 因为 onServerPrefetch 或 async setup 都无法中断 renderToString，所以需要在状态被抛出之前就做一个标记
        globalState.setRenderError(error)
        return Promise.reject(error)
      })
    )
    return
  }

  // Client side: SSR
  // Navigation: fetch on before mount
  if (globalState.isHydrated.value) {
    doFetchOnBeforeMount()
  } else {
    // Hydration: no fetch
    // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
    // isHydrating: https://github.com/vuejs/vue-next/issues/1723
    // isHydrating: https://github.com/vuejs/vue-next/pull/2016
  }
}
