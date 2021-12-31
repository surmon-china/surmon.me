/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia, Pinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRContext } from '/@/universal'

import { useAnnouncementStore } from './announcement'
import { useArchiveStore } from './archive'
import { useArticleStore, useArticleDetailStore } from './article'
import { useCategoryStore } from './category'
import { useTagStore } from './tag'
import { useCommentStore } from './comment'
import { useUniversalStore } from './universal'
import { useMetaStore } from './meta'
import { useLensStore } from './lens'
import { useWallpaperStore } from './wallpaper'

export const useStores = (_pinia?: Pinia) => ({
  announcement: useAnnouncementStore(_pinia),
  archive: useArchiveStore(_pinia),
  article: useArticleStore(_pinia),
  articleDetail: useArticleDetailStore(_pinia),
  category: useCategoryStore(_pinia),
  tag: useTagStore(_pinia),
  comment: useCommentStore(_pinia),
  universal: useUniversalStore(_pinia),
  meta: useMetaStore(_pinia),
  lens: useLensStore(_pinia),
  wallpaper: useWallpaperStore(_pinia)
})

export interface UniversalStoreConfig {
  globalState: GlobalState
}
export const createUniversalStore = (config: UniversalStoreConfig) => {
  const pinia = createPinia()

  const fetchBasicStore = () => {
    // https://pinia.esm.dev/ssr/#using-the-store-outside-of-setup
    const stores = useStores(pinia)
    const initFetchTasks = [
      stores.meta.fetchAppOptions(),
      stores.category.fetchAll(),
      stores.tag.fetchAll()
    ]

    // fetch hot articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.article.fetchHotList())
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
      useStores(pinia).universal.initOnClient()
      return fetchBasicStore()
    }
  }
}
