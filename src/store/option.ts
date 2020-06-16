/**
 * @file Global options
 * @module store/option
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '.'
import http from '/@/services/http'

export enum OptionModuleMutations {
  UpdateAdminInfo = 'updateAdminInfo',
  UpdateAppOptionFetching = 'updateAppOptionFetching',
  UpdateAppOptionData = 'updateAppOptionData',
  UpdateLikesIncrement = 'updateLikesIncrement',
}
export enum OptionModuleActions {
  FetchAdminInfo = 'fetchAdminInfo',
  FetchAppOption = 'fetchAppOption',
  PostLikeSite = 'postLikeSite'
}

const state = () => ({
  adminInfo: {} as any,
  appOption: {
    fetching: false,
    data: null as any
  }
})

const mutations: MutationTree<OptionState> = {
  // 服务端配置的管理员信息
  [OptionModuleMutations.UpdateAdminInfo](state, action) {
    state.adminInfo = action.result
  },
  // 服务端配置
  [OptionModuleMutations.UpdateAppOptionFetching](state, action) {
    state.appOption.fetching = action
  },
  [OptionModuleMutations.UpdateAppOptionData](state, action) {
    state.appOption.data = action.result
  },
  [OptionModuleMutations.UpdateLikesIncrement](state) {
    state.appOption.data.meta.likes++
  }
}

const actions: ActionTree<OptionState, IRootState> = {
  [OptionModuleActions.FetchAdminInfo]({ commit }) {
    return http
      .get('/auth/admin')
      .then(response => commit(OptionModuleMutations.UpdateAdminInfo, response))
  },
  [OptionModuleActions.FetchAppOption]({ commit, state }, force = false) {
    if (!force && state.appOption.data) {
      return Promise.resolve()
    }
    commit(OptionModuleMutations.UpdateAppOptionFetching, true)
    return http
      .get('/option')
      .then(response => commit(OptionModuleMutations.UpdateAppOptionData, response))
      .finally(() => commit(OptionModuleMutations.UpdateAppOptionFetching, false))
  },
  [OptionModuleActions.PostLikeSite]({ commit }) {
    return http.patch('/like/site').then(response => {
      commit(OptionModuleMutations.UpdateLikesIncrement)
      return Promise.resolve(response)
    })
  }
}

const optionModule: Module<OptionState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type OptionState = ReturnType<typeof state>
export default optionModule
