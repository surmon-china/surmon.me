/**
 * @file Categories state
 * @module store/category
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import http from '/@/services/http'
import { IRootState } from '.'

export enum CategoryModuleMutations {
  SetFetched = 'setFetched',
  SetFetching = 'setFetching',
  SetListData = 'setListData'
}
export enum CategoryModuleActions {
  FetchAll = 'fetchAll'
}

const state = () => ({
  fetched: false,
  fetching: false,
  data: [] as Array<$TODO>
})

const mutations: MutationTree<CategoryState> = {
  [CategoryModuleMutations.SetFetched](state, fetched: boolean) {
    state.fetched = fetched
  },
  [CategoryModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [CategoryModuleMutations.SetListData](state, data) {
    state.data = data
  }
}

const actions: ActionTree<CategoryState, IRootState> = {
  [CategoryModuleActions.FetchAll]({ state, commit }) {
    if (state.fetched) {
      return Promise.resolve(state.data)
    }
    commit(CategoryModuleMutations.SetFetching, true)
    return http
      .get('/category', { params: { per_page: 666 }})
      .then(response => {
        commit(CategoryModuleMutations.SetListData, response.result.data)
        commit(CategoryModuleMutations.SetFetched, true)
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
