/**
 * @file Root store
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { Request } from 'express'
import { createStore, useStore as useVuexStore } from 'vuex'
import optionModule, { OptionState, OptionModuleActions } from './option'
import announcementModule, { AnnouncementState } from './announcement'
import categoryModule, { CategoryState, CategoryModuleActions } from './category'
import tagModule, { TagState, TagModuleActions } from './tag'
import sitemapModule, { SitemapState } from './sitemap'
import wallpaperModule, { WallpaperState } from './wallpaper'
import vlogModule, { VlogState } from './vlog'

export enum Modules {
  Announcement = 'announcement',
  Category = 'category',
  Tag = 'tag',
  Sitemap = 'sitemap',
  Option = 'option',
  Wallpaper = 'wallpaper',
  Vlog = 'vlog'
}

export type IRootState = {
  [Modules.Announcement]: AnnouncementState
  [Modules.Category]: CategoryState
  [Modules.Tag]: TagState
  [Modules.Sitemap]: SitemapState
  [Modules.Option]: OptionState
  [Modules.Wallpaper]: WallpaperState
  [Modules.Vlog]: VlogState
}

export type IRootStore = ReturnType<typeof createUniversalStore>
export const createUniversalStore = () => createStore<IRootState>({
  modules: {
    [Modules.Announcement]: announcementModule,
    [Modules.Category]: categoryModule,
    [Modules.Tag]: tagModule,
    [Modules.Sitemap]: sitemapModule,
    [Modules.Option]: optionModule,
    [Modules.Wallpaper]: wallpaperModule,
    [Modules.Vlog]: vlogModule
  }
})

export const useStore = (): IRootStore => {
  return useVuexStore()
}

export const getNamespace = (moduleName: Modules, target: string) => {
  return `${moduleName}/${target}`
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
