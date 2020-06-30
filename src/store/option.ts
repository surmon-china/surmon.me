/**
 * @file Global options
 * @module store/option
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '.'
import http from '/@/services/http'

export enum OptionModuleMutations {
  SetAdminInfo = 'setAdminInfo',
  SetAppOptionFetching = 'setAppOptionFetching',
  SetAppOptionData = 'setAppOptionData',
  IncrementAppLikes = 'incrementAppLikes',
}
export enum OptionModuleActions {
  FetchAdminInfo = 'fetchAdminInfo',
  FetchAppOption = 'fetchAppOption',
  PostSiteLike = 'postSiteLike'
}

const state = () => ({
  adminInfo: null as any,
  appOption: {
    fetching: false,
    data: null as any
  }
})

const mutations: MutationTree<OptionState> = {
  // 服务端配置的管理员信息
  [OptionModuleMutations.SetAdminInfo](state, adminInfo) {
    state.adminInfo = adminInfo
  },
  // 服务端配置
  [OptionModuleMutations.SetAppOptionFetching](state, fetching: boolean) {
    state.appOption.fetching = fetching
  },
  [OptionModuleMutations.SetAppOptionData](state, appOption) {
    state.appOption.data = appOption
  },
  [OptionModuleMutations.IncrementAppLikes](state) {
    if (state.appOption.data) {
      state.appOption.data.meta.likes++
    }
  }
}

const actions: ActionTree<OptionState, IRootState> = {
  [OptionModuleActions.FetchAdminInfo]({ commit }) {
    return http
      .get('/auth/admin')
      .then(response => {
        commit(OptionModuleMutations.SetAdminInfo, response.result)
        return response
      })
  },
  [OptionModuleActions.FetchAppOption]({ commit, state }, force = false) {
    if (!force && state.appOption.data) {
      return Promise.resolve(state.appOption.data)
    }

    commit(OptionModuleMutations.SetAppOptionFetching, true)
    return http
      .get('/option')
      .then(response => {
        commit(OptionModuleMutations.SetAppOptionData, response.result)
        return response
      })
      .finally(() => {
        commit(OptionModuleMutations.SetAppOptionFetching, false)
      })
  },
  [OptionModuleActions.PostSiteLike]({ commit }) {
    return http.patch('/like/site').then(response => {
      commit(OptionModuleMutations.IncrementAppLikes)
      return response
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
