/**
 * @file wallpaper
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { Language } from '/@/language/data'
import { IRootState } from '.'
import http from '/@/services/http'

export const WALLPAPER_API_PATH = '/wallpaper/list'

export enum WallpaperModuleMutations {
  UpdateFetching = 'updateFetching',
  UpdatePapers = 'updatePapers'
}
export enum WallpaperModuleGetters {
  Parpers = 'parpers'
}
export enum WallpaperModuleActions {
  FetchPapers = 'fetchPapers'
}

const state = () => ({
  fetching: false,
  data: {} as {
    [lang in Language]: any
  }
})

export const getters: GetterTree<WallpaperState, IRootState> = {
  [WallpaperModuleGetters.Parpers](state) {
    return (language: Language) => state.data[language]
  }
}

const mutations: MutationTree<WallpaperState> = {
  [WallpaperModuleMutations.UpdateFetching](state, action) {
    state.fetching = action
  },
  [WallpaperModuleMutations.UpdatePapers](state, action: { language: Language, papers: any }) {
    state.data[action.language] = action.papers.result
  }
}

const actions: ActionTree<WallpaperState, IRootState> = {
  [WallpaperModuleActions.FetchPapers]({ commit, state }, language: Language) {

    // return data when exists
    if (state.data[language]) {
      return Promise.resolve(state.data[language])
    }

    const isChinese = language === Language.Zh
    commit(WallpaperModuleMutations.UpdateFetching, true)
    return http
      .get(WALLPAPER_API_PATH, { params: { en: Number(!isChinese) }})
      .then(response => commit(
        WallpaperModuleMutations.UpdatePapers,
        { language, papers: response }
      ))
      .finally(() => commit(WallpaperModuleMutations.UpdateFetching, false))
  }
}

const wallpaperModule: Module<WallpaperState, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export type WallpaperState = ReturnType<typeof state>
export default wallpaperModule
