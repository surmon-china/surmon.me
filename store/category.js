/**
 * @file 分类数据状态 / ES module
 * @module store/category
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
    return this.$axios.$get(`/category`, { params })
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        commit('updateFetching', false)
      })
  }
}
