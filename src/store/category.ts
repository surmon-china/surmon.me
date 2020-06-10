/**
 * @file Categories data
 * @module store/category
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '.'
import http from '/@/services/http'

export enum CategoryModuleMutations {
  UpdateFetching = 'updateFetching',
  UpdateListData = 'updateListData'
}
export enum CategoryModuleActions {
  FetchList = 'fetchList'
}

const state = () => ({
  fetching: false,
  data: [] as Array<any>
})

const mutations: MutationTree<CategoryState> = {
  [CategoryModuleMutations.UpdateFetching](state, action) {
    state.fetching = action
  },
  [CategoryModuleMutations.UpdateListData](state, action) {
    state.data = action.result.data
  }
}

const actions: ActionTree<CategoryState, IRootState> = {
  [CategoryModuleActions.FetchList]({ commit }, params: object) {
    commit(CategoryModuleMutations.UpdateFetching, true)
    return http
      .get('/category', { params })
      .then(response => {
        commit(CategoryModuleMutations.UpdateListData, response)
        return Promise.resolve(response)
      })
      .finally(() => {
        commit(CategoryModuleMutations.UpdateFetching, false)
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
