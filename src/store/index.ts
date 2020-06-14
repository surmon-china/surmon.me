/**
 * @file Root store
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { Request } from 'express'
import { Store, createStore, useStore as useVuexStore } from 'vuex'
import optionModule, { OptionModuleActions } from './option'
import announcementModule from './announcement'
import categoryModule, { CategoryModuleActions } from './category'
import tagModule, { TagModuleActions } from './tag'
import sitemapModule from './sitemap'
import wallpaperModule from './wallpaper'
import vlogModule from './vlog'

export type IRootState = any
export type IRootStore = ReturnType<typeof createUniversalStore>
export const createUniversalStore = () => createStore<{
  // TODO:!!!
  announcement: Store<typeof announcementModule>
}>({
  modules: {
    announcement: announcementModule,
    category: categoryModule,
    tag: tagModule,
    sitemap: sitemapModule,
    option: optionModule,
    wallpaper: wallpaperModule,
    vlog: vlogModule
  }
})

type test = Store<typeof announcementModule>

export function useStore(): IRootStore {
  return useVuexStore()
}

// -----------------------

// TODO: 也许 asyncData | component async steup 已经支持细化组件了
export const initStore = (appContext: any, { target, request: Request }) => {
  const { store, globalState } = appContext

  // init task
  const initFetchAppData = [
    store.dispatch(TagModuleActions.FetchList),
    store.dispatch(CategoryModuleActions.FetchList),
    store.dispatch(OptionModuleActions.FetchAdminInfo)
  ]

  // fetch hot articles when desktop env
  if (!globalState.isMobile) {
    // initFetchAppData.push(store.dispatch('article/fetchHotList'))
  }

  return Promise.all(initFetchAppData)
}
