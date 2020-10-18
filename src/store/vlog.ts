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
  SetFetching = 'setFetching',
  SetVideoData = 'setVideoData'
}
export enum VlogModuleActions {
  FetchVideos = 'fetchVideos'
}

const state = () => ({
  fetching: false,
  data: null as any as {
    count: number
    vlist: Array<any>
  }
})

const mutations: MutationTree<VlogState> = {
  [VlogModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [VlogModuleMutations.SetVideoData](state, data) {
    state.data = data
  }
}

const actions: ActionTree<VlogState, IRootState> = {
  [VlogModuleActions.FetchVideos]({ commit, state }, params: any = {}) {
    // return data when exists
    if (state.data) {
      return Promise.resolve(state.data)
    }

    commit(VlogModuleMutations.SetFetching, true)
    return http
      .get(VLOG_API_PATH, { ...params, per_page: 66 })
      .then(response => {
        commit(VlogModuleMutations.SetVideoData, response.result)
        return response
      })
      .finally(() => {
        commit(VlogModuleMutations.SetFetching, false)
      })
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
