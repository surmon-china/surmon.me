/**
 * @file 标签数据状态 / ES module
 * @module store/tag
 * @author Surmon <https://github.com/surmon-china>
 */

export const TAG_API_PATH = '/tag'

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
  fetchList({ commit }) {
    commit('updateFetching', true)
    return this.$axios
      .$get(TAG_API_PATH, { params: { cache: 1 } })
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(() => {
        commit('updateFetching', false)
      })
  }
}
