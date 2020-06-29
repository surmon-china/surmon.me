/**
 * @file Vlog videos
 * @module store/vlog
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import http from '/@/services/http'
import { IRootState } from '.'

export const VLOG_API_PATH = '/bilibili/list'

export enum VlogModuleMutations {
  UpdateFetching = 'updateFetching',
  UpdateVideoData = 'updateVideoData'
}
export enum VlogModuleActions {
  FetchVideos = 'fetchVideos'
}

const state = () => ({
  fetching: false,
  data: {
    pages: 0,
    count: 0,
    vlist: [] as Array<any>
  }
})

const mutations: MutationTree<VlogState> = {
  [VlogModuleMutations.UpdateFetching](state, action) {
    state.fetching = action
  },
  [VlogModuleMutations.UpdateVideoData](state, action) {
    state.data = action.result
  }
}

const actions: ActionTree<VlogState, IRootState> = {
  [VlogModuleActions.FetchVideos]({ commit, state }, params: any = {}) {
    params.per_page = params.per_page || 66

    // return data when exists
    if (state.data.vlist.length) {
      return Promise.resolve(state.data)
    }

    commit(VlogModuleMutations.UpdateFetching, true)
    return http
      .get(VLOG_API_PATH, { params })
      .then(response => commit(VlogModuleMutations.UpdateVideoData, response))
      .finally(() => commit(VlogModuleMutations.UpdateFetching, false))
  }
}

const vlogModule: Module<VlogState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type VlogState = ReturnType<typeof state>
export default vlogModule
