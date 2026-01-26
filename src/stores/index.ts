/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRStateValue } from '/@/app/universal'
import { useStores } from './_hook'
export { useStores } from './_hook'

export interface UniversalStoreConfig {
  globalState: GlobalState
}

export const createUniversalStore = (config: UniversalStoreConfig) => {
  const pinia = createPinia()

  // Fetch basic store data on the server side
  // This is used to prefetch data before rendering the page
  // and to hydrate the store on the client side
  const fetchBasicStore = () => {
    // https://pinia.vuejs.org/ssr/#using-the-store-outside-of-setup
    const stores = useStores(pinia)
    const initFetchTasks = [
      stores.appOptionsStore.fetch(), // app basic configuration
      stores.categoryStore.fetch(), // basic categories data
      stores.tagStore.fetch() // basic tags data
    ]
    // fetch featured articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.featuredArticleListStore.fetch())
    }
    return Promise.all(initFetchTasks)
  }

  return {
    get stores() {
      return useStores(pinia)
    },
    state: pinia.state,
    install: pinia.install,
    prefetchOnServer: fetchBasicStore,
    hydrateOnClient() {
      const contextStore = getSSRStateValue('store')
      if (contextStore) {
        // The data passed from the SSR server is used to initialize the pinia
        pinia.state.value = contextStore
      } else {
        // fallback: when SSR page error
        fetchBasicStore()
      }
    }
  }
}
