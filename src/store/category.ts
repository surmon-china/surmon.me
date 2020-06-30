/**
 * @file Categories data
 * @module store/category
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import http from '/@/services/http'
import { IRootState } from '.'

export enum CategoryModuleMutations {
  SetFetching = 'setFetching',
  SetListData = 'setListData'
}
export enum CategoryModuleActions {
  FetchList = 'fetchList'
}

const state = () => ({
  fetching: false,
  data: [] as Array<$TODO>
})

const mutations: MutationTree<CategoryState> = {
  [CategoryModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [CategoryModuleMutations.SetListData](state, data) {
    state.data = data
  }
}

const actions: ActionTree<CategoryState, IRootState> = {
  [CategoryModuleActions.FetchList]({ commit }, params: object) {
    commit(CategoryModuleMutations.SetFetching, true)
    return http
      .get('/category', { params })
      .then(response => {
        commit(CategoryModuleMutations.SetListData, response.result.data)
        return response
      })
      .finally(() => {
        commit(CategoryModuleMutations.SetFetching, false)
      })
  }
}

const categoryModule: Module<CategoryState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type CategoryState = ReturnType<typeof state>
export default categoryModule
