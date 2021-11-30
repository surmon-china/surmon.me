/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRStoreData } from '/@/universal'
import { useArticleStore } from './article'
import { useCategoryStore } from './category'
import { useTagStore } from './tag'
import { useMetaStore } from './meta'

export interface UniversalStoreConfig {
  globalState: GlobalState
}
export const createUniversalStore = (config: UniversalStoreConfig) => {
  const pinia = createPinia()
  const doPreFetchTask = () => {
    const initFetchTasks = [
      useTagStore().fetchAll(),
      useCategoryStore().fetchAll(),
      useMetaStore().fetchAdminInfo(),
      useMetaStore().fetchAppOptions()
    ]

    // fetch hot articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(useArticleStore().fetchHotList())
    }

    return Promise.all(initFetchTasks)
  }

  return {
    install: pinia.install,
    serverInit() {
      return doPreFetchTask()
    },
    clientInit() {
      return doPreFetchTask()
    },
    clientSSRInit() {
      pinia.state.value = getSSRStoreData()
      return pinia
    }
  }
}
