/**
 * @file Vlog 项目数据状态 / ES module
 * @module store/vlog
 * @author Surmon <https://github.com/surmon-china>
 */

export const state = () => {
  return {
    video: {
      fetching: false,
      data: {
        vlist: []
      }
    }
  }
}

export const mutations = {
  updateVideoFetching(state, action) {
    state.video.fetching = action
  },
  updateVideoData(state, action) {
    state.video.data = action.result
  },
}

export const actions = {

  // 获取视频列表
  fetchVideos({ commit, state }, params = {}) {

    params.per_page = params.per_page || 66

    // 如果数据已存在，则直接返回
    if (state.video.data.length) {
      return Promise.resolve(state.project.video.data)
    }

    // 不存在则请求新数据
    commit('updateVideoFetching', true)
    return this.$axios.$get('/bilibili/list', { params })
      .then(response => {
        commit('updateVideoData', response)
        commit('updateVideoFetching', false)
      })
      .catch(error => commit('updateVideoFetching', false))
  },
}
