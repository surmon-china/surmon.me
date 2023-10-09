/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRStateValue } from '/@/universal'
import { useStores } from './_hook'
export { useStores } from './_hook'

export interface UniversalStoreConfig {
  globalState: GlobalState
}

export const createUniversalStore = (config: UniversalStoreConfig) => {
  const pinia = createPinia()
  const fetchBasicStore = () => {
    // https://pinia.esm.dev/ssr/#using-the-store-outside-of-setup
    const stores = useStores(pinia)
    const initFetchTasks = [
      // app basic configuration
      stores.appOption.fetch(),
      // basic data
      stores.category.fetch(),
      stores.tag.fetch()
    ]
    // fetch hot articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.featuredArticleList.fetch())
    }
    return Promise.all(initFetchTasks)
  }

  return {
    get stores() {
      return useStores(pinia)
    },
    state: pinia.state,
    install: pinia.install,
    serverPrefetch: fetchBasicStore,
    hydrate() {
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
