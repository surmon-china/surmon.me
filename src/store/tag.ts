/**
 * @file Tags data
 * @module store/tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '.'
import http from '/@/services/http'

export enum TagModuleMutations {
  SetFetched = 'setFetched',
  SetFetching = 'setFetching',
  SetListData = 'setListData'
}
export enum TagModuleActions {
  FetchAll = 'fetchAll'
}

const state = () => ({
  fetched: false,
  fetching: false,
  data: [] as Array<$TODO>
})

const mutations: MutationTree<TagState> = {
  [TagModuleMutations.SetFetched](state, fetched: boolean) {
    state.fetched = fetched
  },
  [TagModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [TagModuleMutations.SetListData](state, result) {
    state.data = result.data
  }
}

const actions: ActionTree<TagState, IRootState> = {
  [TagModuleActions.FetchAll]({ state, commit }) {
    if (state.fetched) {
      return Promise.resolve(state.data)
    }
    commit(TagModuleMutations.SetFetching, true)
    return http
      .get('/tag', { params: { cache: 1 }})
      .then(response => {
        commit(TagModuleMutations.SetListData, response.result)
        commit(TagModuleMutations.SetFetched, true)
        return response
      })
      .finally(() => {
        commit(TagModuleMutations.SetFetching, false)
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
