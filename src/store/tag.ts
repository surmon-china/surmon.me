/**
 * @file Tags data
 * @module store/tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '.'
import http from '/@/services/http'

export enum TagModuleMutations {
  UpdateFetching = 'updateFetching',
  UpdateListData = 'updateListData'
}
export enum TagModuleActions {
  FetchList = 'fetchList'
}

const state = () => ({
  fetching: false,
  data: [] as Array<any>
})

const mutations: MutationTree<TagState> = {
  [TagModuleMutations.UpdateFetching](state, action) {
    state.fetching = action
  },
  [TagModuleMutations.UpdateListData](state, action) {
    state.data = action.result.data
  }
}

const actions: ActionTree<TagState, IRootState> = {
  [TagModuleActions.FetchList]({ commit }, params: object) {
    commit(TagModuleMutations.UpdateFetching, true)
    return http
      .get('/tag', { params })
      .then(response => {
        commit(TagModuleMutations.UpdateListData, response)
        return Promise.resolve(response)
      })
      .finally(() => {
        commit(TagModuleMutations.UpdateFetching, false)
      })
  }
}

const tagModule: Module<TagState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type TagState = ReturnType<typeof state>
export default tagModule
