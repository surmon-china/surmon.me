/**
 * @file Universal hydration
 * @module universal.hydration
 * @author Surmon <https://github.com/surmon-china>
 */

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
import { useSSRContext, watchEffect } from 'vue'
import { isClient, isServer } from '/@/app/environment'
import { SSRData, getSSRContextValue } from './context'

/**
 * Allows full control of the hydration cycle to set and receive data from the server.
 *
 * @param key a unique key to identify the data in the Nuxt payload
 * @param get a function that returns the value to set the initial data
 * @param set a function that will receive the data on the client-side
 * @link https://github.com/nuxt/framework/blob/main/packages/nuxt3/src/app/composables/hydrate.ts
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
