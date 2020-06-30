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
import articleModule, { ArticleState, ArticleModuleActions } from './article'
import commentModule, { CommentState, CommentModuleActions } from './comment'
import sitemapModule, { SitemapState } from './sitemap'
import wallpaperModule, { WallpaperState } from './wallpaper'
import vlogModule, { VlogState } from './vlog'

export enum Modules {
  Announcement = 'announcement',
  Category = 'category',
  Tag = 'tag',
  Article = 'article',
  Comment = 'comment',
  Sitemap = 'sitemap',
  Option = 'option',
  Wallpaper = 'wallpaper',
  Vlog = 'vlog'
}

export type IRootState = {
  [Modules.Announcement]: AnnouncementState
  [Modules.Category]: CategoryState
  [Modules.Tag]: TagState
  [Modules.Article]: ArticleState
  [Modules.Comment]: CommentState
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
    [Modules.Article]: articleModule,
    [Modules.Comment]: commentModule,
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
    store.dispatch(getNamespace(Modules.Tag, TagModuleActions.FetchList)),
    store.dispatch(getNamespace(Modules.Category, CategoryModuleActions.FetchList)),
    store.dispatch(getNamespace(Modules.Option, OptionModuleActions.FetchAdminInfo))
  ]

  // fetch hot articles when desktop env
  if (!globalState.isMobile) {
    initFetchAppData.push(
      store.dispatch(getNamespace(Modules.Article, ArticleModuleActions.FetchList))
    )
  }

  return Promise.all(initFetchAppData)
}
