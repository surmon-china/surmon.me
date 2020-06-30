/**
 * @file Announcement
 * @module store/announcement
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import http from '/@/services/http'
import { IRootState } from '.'

export enum AnnouncementModuleMutations {
  SetFetching = 'setFetching',
  SetListData = 'setListData'
}
export enum AnnouncementModuleActions {
  FetchList = 'fetchList'
}

const state = () => ({
  fetching: false,
  data: [] as Array<$TODO>
})

const mutations: MutationTree<AnnouncementState> = {
  [AnnouncementModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [AnnouncementModuleMutations.SetListData](state, action) {
    state.data = action
  }
}

const actions: ActionTree<AnnouncementState, IRootState> = {
  [AnnouncementModuleActions.FetchList]({ commit }, params: object) {
    commit(AnnouncementModuleMutations.SetFetching, true)
    return http
      .get('/announcement', { params })
      .then(response => {
        commit(AnnouncementModuleMutations.SetListData, response.result.data)
        return response
      })
      .finally(() => {
        commit(AnnouncementModuleMutations.SetFetching, false)
      })
  }
}

const announcementModule: Module<AnnouncementState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type AnnouncementState = ReturnType<typeof state>
export default announcementModule
