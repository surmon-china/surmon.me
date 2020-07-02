/**
 * @file Root store
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { createStore, useStore as useVuexStore } from 'vuex'
import optionModule, { OptionState } from './option'
import announcementModule, { AnnouncementState } from './announcement'
import categoryModule, { CategoryState } from './category'
import tagModule, { TagState } from './tag'
import articleModule, { ArticleState } from './article'
import commentModule, { CommentState } from './comment'
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
