/**
 * @file App universal prefetch
 * @module universal/prefetch
 * @author Surmon <https://github.com/surmon-china>
 */

import { onBeforeMount, onServerPrefetch } from 'vue'
import { isServer, isClient } from '/@/configs/app.env'
import { useGlobalState } from '/@/app/state'

// onServerPrefetch === async setup
// https://vuejs.org/api/composition-api-lifecycle#onserverprefetch
// https://nuxt.com/docs/api/composables/use-fetch
// https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
// https://github.com/nuxt/framework/blob/main/packages/nuxt/src/app/composables/asyncData.ts
// https://github.com/nuxt-community/composition-api/blob/main/src/runtime/composables/async.ts
export const useUniversalFetch = (fetcher: () => Promise<any>) => {
  const globalState = useGlobalState()

  // SSR: server
  if (isServer) {
    onServerPrefetch(() => {
      return fetcher().catch((error) => {
        // HACK: Since neither `onServerPrefetch` nor `async setup` can break `renderToString`, so need to mark the status before it's thrown.
        globalState.setRenderError(error)
        return Promise.reject(error)
      })
    })
  }

  // SSR: client
  if (isClient) {
    // After the hydration first screen, all client actions, such as navigating to a new page, require a data request.
    if (globalState.isHydrated.value) {
      onBeforeMount(() => fetcher())
    } else {
      // Hydration: nothing needs to be done, the store data is initialized with the SSR context
      // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
      // isHydrating: https://github.com/vuejs/vue-next/issues/1723
      // isHydrating: https://github.com/vuejs/vue-next/pull/2016
    }
  }
}
