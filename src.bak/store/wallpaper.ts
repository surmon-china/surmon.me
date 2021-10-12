/**
 * @file Wallpaper state
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { TunnelModule } from '/@/constants/tunnel'
import { Language } from '/@/language/data'
import tunnel from '/@/services/tunnel'
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
  data: null as any as {
    [lang in Language]: Array<any>
  }
})

export const getters: GetterTree<WallpaperState, IRootState> = {
  [WallpaperModuleGetters.Papers](state) {
    return (language: Language) => state.data?.[language]
  }
}

const mutations: MutationTree<WallpaperState> = {
  [WallpaperModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [WallpaperModuleMutations.SetPapers](state, action) {
    state.data = action
  }
}

const actions: ActionTree<WallpaperState, IRootState> = {
  [WallpaperModuleActions.FetchPapers]({ commit, state }) {
    // return data when exists
    if (state.data) {
      return Promise.resolve(state.data)
    }

    commit(WallpaperModuleMutations.SetFetching, true)
    return tunnel
      .dispatch(TunnelModule.Wallpaper)
      .then(response => {
        commit(WallpaperModuleMutations.SetPapers, response)
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
