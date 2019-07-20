/**
 * @file wallpaper / ES module
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

export const WALLPAPER_API_PATH = '/wallpaper/list'

export const state = () => {
  return {
    papers: {
      fetching: false,
      data: null
    }
  }
}

export const mutations = {
  updatePapersFetching(state, action) {
    state.papers.fetching = action
  },
  updatePapersData(state, action) {
    state.papers.data = action.result
  }
}

export const actions = {
  
  // 获取今日壁纸
  fetchPapers({ commit, state }) {

    // 如果数据已存在，则直接返回 Promise 成功，并返回数据
    if (state.papers.data) {
      return Promise.resolve(state.papers.data)
    }

    // 不存在则请求新数据
    commit('updatePapersFetching', true)
    return this.$axios.$get(WALLPAPER_API_PATH)
      .then(response => {
        commit('updatePapersData', response)
        commit('updatePapersFetching', false)
      })
      .catch(error => commit('updatePapersFetching', false))
  }
}
