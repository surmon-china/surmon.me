/**
 * @file wallpaper / ES module
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

export const state = () => {
  return {
    papers: {
      fetching: false,
      data: null
    },
    story: {
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
  },
  updateStoryFetching(state, action) {
    state.story.fetching = action
  },
  updateStoryData(state, action) {
    state.story.data = action.result
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
    return this.$axios.$get(`/wallpaper/list`)
      .then(response => {
        commit('updatePapersData', response)
        commit('updatePapersFetching', false)
      })
      .catch(error => commit('updatePapersFetching', false))
  },

  // 获取今日壁纸故事
  fetchStory({ commit, state }) {

    // 如果数据已存在，则直接返回 Promise 成功，并返回数据
    if (state.story.data) {
      return Promise.resolve(state.story.data)
    }

    // 不存在则请求新数据
    commit('updateStoryFetching', true)
    return this.$axios.$get(`/wallpaper/story`)
      .then(response => {
        commit('updateStoryData', response)
        commit('updateStoryFetching', false)
      })
      .catch(error => commit('updateStoryFetching', false))
  },
}
