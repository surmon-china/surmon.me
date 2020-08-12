/**
 * @file wallpaper
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import http from '/@/services/http'
import { Language } from '/@/language/data'
import { IRootState } from '.'

export const WALLPAPER_API_PATH = '/wallpaper/list'

export enum WallpaperModuleMutations {
  SetFetching = 'setFetching',
  SetPapers = 'setPapers'
}
export enum WallpaperModuleGetters {
  Papers = 'papers'
}
export enum WallpaperModuleActions {
  FetchPapers = 'fetchPapers'
}

const state = () => ({
  fetching: false,
  data: {
    [Language.En]: null as any,
    [Language.Zh]: null as any
  } as {
    [lang in Language]: any
  }
})

export const getters: GetterTree<WallpaperState, IRootState> = {
  [WallpaperModuleGetters.Papers](state) {
    return (language: Language) => state.data[language]
  }
}

const mutations: MutationTree<WallpaperState> = {
  [WallpaperModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [WallpaperModuleMutations.SetPapers](state, action: { language: Language, papers: any }) {
    state.data[action.language] = action.papers
  }
}

const actions: ActionTree<WallpaperState, IRootState> = {
  [WallpaperModuleActions.FetchPapers]({ commit, state }, language: Language) {
    // return data when exists
    if (state.data[language]) {
      return Promise.resolve(state.data[language])
    }

    const isChinese = language === Language.Zh
    const emParam = Number(!isChinese)

    commit(WallpaperModuleMutations.SetFetching, true)
    return http
      .get(WALLPAPER_API_PATH, { params: { en: emParam }})
      .then(response => {
        commit(
          WallpaperModuleMutations.SetPapers,
          { language, papers: response.result }
        )
        return response
      })
      .finally(() => {
        commit(WallpaperModuleMutations.SetFetching, false)
      })
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
