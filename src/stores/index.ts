/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia, Pinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRContext } from '/@/universal'

import { useAnnouncementStore } from './announcement'
import { useArticleListStore, useArticleDetailStore } from './article'
import { useCategoryStore } from './category'
import { useTagStore } from './tag'
import { useCommentStore } from './comment'
import { useArchiveStore } from './archive'
import { useStatisticStore } from './statistic'
import { useUniversalStore } from './universal'
import { useMetaStore } from './meta'
import { useLensStore } from './lens'
import { useTwitterStore } from './twitter'
import { useWallpaperStore } from './wallpaper'
import { useArticleCalendarStore } from './aggregate'

export const useStores = (_pinia?: Pinia) => ({
  announcement: useAnnouncementStore(_pinia),
  articleList: useArticleListStore(_pinia),
  articleDetail: useArticleDetailStore(_pinia),
  category: useCategoryStore(_pinia),
  tag: useTagStore(_pinia),
  comment: useCommentStore(_pinia),
  archive: useArchiveStore(_pinia),
  statistic: useStatisticStore(_pinia),
  universal: useUniversalStore(_pinia),
  meta: useMetaStore(_pinia),
  lens: useLensStore(_pinia),
  twitter: useTwitterStore(_pinia),
  wallpaper: useWallpaperStore(_pinia),
  articleCalendar: useArticleCalendarStore(_pinia)
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
      useStores(pinia).universal.initOnClient()
      return fetchBasicStore()
    }
  }
}
