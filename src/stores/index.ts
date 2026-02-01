/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRStateValue } from '/@/app/universal'
import { useAppOptionsStore } from '/@/stores/foundation'
import { useFeaturedArticleListStore } from '/@/stores/article-rankings'
import { useCategoryStore } from '/@/stores/category'
import { useTagStore } from '/@/stores/tag'

export interface UniversalStoreConfig {
  globalState: GlobalState
}

export const createUniversalStore = (config: UniversalStoreConfig) => {
  const pinia = createPinia()

  // Fetch basic store data on the server side.
  // This is used to prefetch data before rendering the page and to hydrate the store on the client side.
  const fetchBasicStore = () => {
    // https://pinia.vuejs.org/ssr/#using-the-store-outside-of-setup
    const initFetchTasks = [
      useAppOptionsStore(pinia).fetch(), // app nodepress config
      useCategoryStore(pinia).fetch(), // basic categories data
      useTagStore(pinia).fetch() // basic tags data
    ]
    // fetch featured articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(useFeaturedArticleListStore(pinia).fetch())
    }
    return Promise.all(initFetchTasks)
  }

  return {
    pinia,
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
