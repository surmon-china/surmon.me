/**
 * @file Announcement
 * @module store/announcement
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import http from '/@/services/http'
import { IRootState } from '.'

export enum AnnouncementModuleMutations {
  UpdateFetching = 'updateFetching',
  UpdateListData = 'updateListData'
}
export enum AnnouncementModuleActions {
  FetchList = 'fetchList'
}

const state = {
  fetching: false,
  data: [] as Array<any>
}

const mutations: MutationTree<AnnouncementState> = {
  [AnnouncementModuleMutations.UpdateFetching](state, action) {
    state.fetching = action
  },
  [AnnouncementModuleMutations.UpdateListData](state, action) {
    state.data = action.result.data
  }
}

const actions: ActionTree<AnnouncementState, IRootState> = {
  [AnnouncementModuleActions.FetchList]({ commit }, params: object) {
    commit(AnnouncementModuleMutations.UpdateFetching, true)
    return http
      .get('/announcement', { params })
      .then(response => {
        commit(AnnouncementModuleMutations.UpdateListData, response)
        return Promise.resolve(response)
      })
      .finally(() => {
        commit(AnnouncementModuleMutations.UpdateFetching, false)
      })
  }
}

const announcementModule: Module<AnnouncementState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type AnnouncementState = typeof state
export default announcementModule
