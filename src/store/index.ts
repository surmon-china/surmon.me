/**
 * @file Root store
 * @module store
 * @author Surmon <https://github.com/surmon-china>
 */

import { createStore, useStore as useVuexStore } from 'vuex'
import { GlobalState } from '/@/state'
import { getSSRStoreData } from '/@/universal'
import announcementModule, { AnnouncementState } from './announcement'
import optionModule, { OptionState, OptionModuleActions } from './option'
import articleModule, { ArticleState, ArticleModuleActions } from './article'
import categoryModule, { CategoryState, CategoryModuleActions } from './category'
import tagModule, { TagState, TagModuleActions } from './tag'
import commentModule, { CommentState } from './comment'
import archiveModule, { ArchiveState } from './archive'
import wallpaperModule, { WallpaperState } from './wallpaper'
import vlogModule, { VlogState } from './vlog'

export enum Modules {
  Announcement = 'announcement',
  Category = 'category',
  Tag = 'tag',
  Article = 'article',
  Comment = 'comment',
  Archive = 'archive',
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
  [Modules.Archive]: ArchiveState
  [Modules.Option]: OptionState
  [Modules.Wallpaper]: WallpaperState
  [Modules.Vlog]: VlogState
}

export type IRootStore = ReturnType<typeof createVuexStore>
const createVuexStore = () => createStore<IRootState>({
  modules: {
    [Modules.Announcement]: announcementModule,
    [Modules.Category]: categoryModule,
    [Modules.Tag]: tagModule,
    [Modules.Article]: articleModule,
    [Modules.Comment]: commentModule,
    [Modules.Archive]: archiveModule,
    [Modules.Option]: optionModule,
    [Modules.Wallpaper]: wallpaperModule,
    [Modules.Vlog]: vlogModule
  }
})

export const useStore = (): IRootStore => {
  return useVuexStore() as IRootStore
}

export const getNamespace = (moduleName: Modules, target: string) => {
  return `${moduleName}/${target}`
}

export interface UniversalStoreConfig {
  globalState: GlobalState
}
export const createUniversalStore = (config: UniversalStoreConfig) => {
  const store = createVuexStore()
  const doPreFetchTask = () => {
    const initFetchTasks = [
      store.dispatch(getNamespace(Modules.Tag, TagModuleActions.FetchAll)),
      store.dispatch(getNamespace(Modules.Category, CategoryModuleActions.FetchAll)),
      store.dispatch(getNamespace(Modules.Option, OptionModuleActions.FetchAdminInfo)),
      store.dispatch(getNamespace(Modules.Option, OptionModuleActions.FetchAppOption))
    ]

    // fetch hot articles when desktop env
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(
        store.dispatch(getNamespace(Modules.Article, ArticleModuleActions.FetchHotList))
      )
    }

    return Promise.all(initFetchTasks)
  }

  return Object.assign(store, {
    serverInit() {
      return doPreFetchTask()
    },
    clientInit() {
      return doPreFetchTask()
    },
    clientSSRInit() {
      return store.replaceState(getSSRStoreData())
    }
  })
}
