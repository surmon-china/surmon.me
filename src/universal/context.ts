/**
 * @file App universal context
 * @module universal.context
 * @author Surmon <https://github.com/surmon-china>
 */

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
import { watchEffect } from 'vue'
import { isClient, isServer } from '/@/app/environment'

// Symble
const SSR_SYMBLE_KEY = '__SSR__'
export const renderSSRSymbleScript = () => {
  return `<script>window.${SSR_SYMBLE_KEY} = true</script>`
}
export const getSSRSymbleStatus = () => Boolean((window as any)[SSR_SYMBLE_KEY])

// Context
const SSR_CONTEXT_KEY = '__INITIAL_SSR_CONTEXT__'
// for renderer
export const renderSSRContextScript = (data: string) => {
  return `<script>window.${SSR_CONTEXT_KEY} = ${data}</script>`
}
// for client
export const getSSRContextData = (): Partial<SSRContext> | null => {
  return (window as any)[SSR_CONTEXT_KEY] || null
}

export interface SSRContext {
  store: any
  refs: any
  url: string
  [key: string]: any
}

// ssr context
let ssrContext: Partial<SSRContext> = {}
// for server temp
export const setSSRContext = (key: keyof SSRContext, value: any) => {
  ssrContext[key] = value ? JSON.parse(JSON.stringify(value)) : value
}
// for server and client
export const getSSRContext = (key: keyof SSRContext) => {
  return isClient ? getSSRContextData()?.[key] : ssrContext[key]
}

// for app
export function rebirthSSRContext(app: any) {
  ssrContext = Object.assign({}, {})
  app.config.globalProperties.$ssrContext = ssrContext
  return ssrContext
}
export function getSSRContextByApp(app: any) {
  return app.config.globalProperties.$ssrContext || ssrContext
}

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
// https://github.com/nuxt/framework/blob/main/packages/nuxt3/src/app/composables/hydrate.ts
// MARK: memory leak
export const useHydration = <T>(key: keyof SSRContext, get: () => T, set: (value: T) => void) => {
  if (isServer) {
    watchEffect(() => {
      setSSRContext(key, get())
    })
  }
  if (isClient) {
    set(getSSRContext(key))
  }
}
