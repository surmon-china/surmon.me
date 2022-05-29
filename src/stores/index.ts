/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRContext } from '/@/universal'
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
      // basic data
      stores.category.fetch(),
      stores.tag.fetch(),
      // app option (etc. ad_config, site_email, title, keywords)
      stores.appOption.fetch()
    ]
    // fetch hot articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.articleList.fetchHottestList())
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
    initOnSSRClient() {
      const contextStore = getSSRContext('store')
      if (contextStore) {
        pinia.state.value = contextStore
      } else {
        // fallback when SSR page error
        fetchBasicStore()
      }
    },
    initOnSPAClient() {
      useStores(pinia).identity.initOnClient()
      return fetchBasicStore()
    }
  }
}
