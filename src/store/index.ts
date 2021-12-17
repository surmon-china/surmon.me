/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createPinia } from 'pinia'
import { GlobalState } from '/@/app/state'
import { getSSRContext } from '/@/universal'

import { useAnnouncementStore } from './announcement'
import { useArchiveStore } from './archive'
import { useArticleStore, useArticleDetailStore } from './article'
import { useCategoryStore } from './category'
import { useTagStore } from './tag'
import { useCommentStore } from './comment'
import { useMetaStore } from './meta'
import { useLensStore } from './lens'
import { useWallpaperStore } from './wallpaper'

export const useStores = () => ({
  announcement: useAnnouncementStore(),
  archive: useArchiveStore(),
  article: useArticleStore(),
  articleDetail: useArticleDetailStore(),
  category: useCategoryStore(),
  tag: useTagStore(),
  comment: useCommentStore(),
  meta: useMetaStore(),
  lens: useLensStore(),
  wallpaper: useWallpaperStore()
})

export interface UniversalStoreConfig {
  globalState: GlobalState
}
export const createUniversalStore = (config: UniversalStoreConfig) => {
  const pinia = createPinia()
  const doPreFetchTask = () => {
    const stores = useStores()
    const initFetchTasks = [
      stores.tag.fetchAll(),
      stores.category.fetchAll(),
      stores.meta.fetchAdminInfo(),
      stores.meta.fetchAppOptions()
    ]

    // fetch hot articles when desktop only
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.article.fetchHotList())
    }

    return Promise.all(initFetchTasks)
  }

  return {
    state: pinia.state,
    install: pinia.install,
    prefetch: doPreFetchTask,
    get stores() {
      return useStores()
    },
    initInSSR() {
      const contextStore = getSSRContext('store')
      if (contextStore) {
        pinia.state.value = contextStore
      } else {
        doPreFetchTask()
      }
    },
    initInSPA() {
      return doPreFetchTask()
    }
  }
}
