import { onBeforeMount, onServerPrefetch } from 'vue'
import { isServer, isClient } from '/@/configs/app.env'
import { useGlobalState } from '/@/app/state'

// onServerPrefetch === async setup
// https://nuxt.com/docs/api/composables/use-fetch
// https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
// https://github.com/nuxt/framework/blob/main/packages/nuxt/src/app/composables/asyncData.ts
// https://github.com/nuxt-community/composition-api/blob/main/src/runtime/composables/async.ts

export const useUniversalFetch = (fetcher: () => Promise<any>) => {
  const globalState = useGlobalState()

  if (isServer) {
    // Server side
    // https://github.com/vuejs/composition-api/pull/198/files
    // https://vuejs.org/api/composition-api-lifecycle#onserverprefetch
    onServerPrefetch(() => {
      return fetcher().catch((error) => {
        // HACK: Since neither `onServerPrefetch` nor `async setup` can break `renderToString`, so need to mark the status before it's thrown.
        globalState.setError(error)
        return Promise.reject(error)
      })
    })
  }

  if (isClient) {
    // Client side: After the hydration first screen, all client actions, such as navigating to a new page, require a data request.
    if (globalState.isHydrated) {
      onBeforeMount(() => fetcher())
    } else {
      // Hydration: nothing needs to be done, the store data is initialized with the SSR context
      // isHydrating: https://github.com/vuejs/vue-next/issues/1723
      // isHydrating: https://github.com/vuejs/vue-next/pull/2016
    }
  }
}
