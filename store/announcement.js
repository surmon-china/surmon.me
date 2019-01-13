/**
 * @file 公告数据状态 / ES module
 * @module store/announcement
 * @author Surmon <https://github.com/surmon-china>
 */

export const state = () => {
  return {
    fetching: false,
    data: []
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action.result.data
  }
}

export const actions = {
  fetchList({ commit }, params) {
    commit('updateFetching', true)
    return this.$axios.$get(`/announcement`, { params })
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
        return Promise.resolve(response)
      })
      .catch(error => {
        commit('updateFetching', false)
        return Promise.reject(error)
      })
  }
}
