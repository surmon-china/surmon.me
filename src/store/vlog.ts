/**
 * @file Vlog videos state
 * @module store/vlog
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { TunnelModule } from '/@/constants/tunnel'
import { getTunnelApiPath } from '/@/transforms/url'
import tunnel from '/@/services/tunnel'
import { IRootState } from '.'

export enum VlogModuleMutations {
  SetFetching = 'setFetching',
  SetVideoData = 'setVideoData'
}
export enum VlogModuleActions {
  FetchVideos = 'fetchVideos'
}

const state = () => ({
  fetching: false,
  data: null as any as Array<any>
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
  [VlogModuleActions.FetchVideos]({ commit, state }) {
    // return data when exists
    if (state.data) {
      return Promise.resolve(state.data)
    }

    commit(VlogModuleMutations.SetFetching, true)
    return tunnel
      .get(getTunnelApiPath(TunnelModule.Bilibili))
      .then(response => {
        commit(VlogModuleMutations.SetVideoData, response)
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
