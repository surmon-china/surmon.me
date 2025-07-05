import { useSSRContext, watchEffect } from 'vue'
import { isClient, isServer } from '/@/configs/app.env'
import { SSRData, getSSRContextValue } from './script'

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
// https://github.com/nuxt/framework/blob/main/packages/nuxt3/src/app/composables/hydrate.ts
// https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts

/**
 * Allows full control of the hydration cycle to set and receive data from the server.
 *
 * @param key a unique key to identify the data in the Nuxt payload
 * @param get a function that returns the value to set the initial data
 * @param set a function that will receive the data on the client-side
 * @example
    useHydration(
      'store',
      () => pinia.state.value,
      (storeState) => (pinia.state.value = storeState)
    )
 */
export const useHydration = <T>(key: keyof SSRData, get: () => T, set: (value: T | undefined) => void) => {
  if (isServer) {
    // https://vuejs.org/api/ssr.html#usessrcontext
    const ssrContext = useSSRContext()!
    watchEffect(() => {
      ssrContext[key] = get()
    })
  }
  if (isClient) {
    set(getSSRContextValue(key))
  }
}
