/**
 * @file Music 数据状态 / ES module
 * @module store/music
 * @author Surmon <https://github.com/surmon-china>
 */

import appConfig from '~/config/app.config'

export const state = () => {
  return {
    list: {
      fetching: false,
      data: null
    },
    lrc: {
      fetching: false,
      data: null
    }
  }
}

export const mutations = {
  updateListFetching(state, action) {
    state.list.fetching = action
  },
  updateListData(state, action) {
    state.list.data = action
  },
  updateLrcFetching(state, action) {
    state.lrc.fetching = action
  },
  updateLrcData(state, action) {
    state.lrc.data = action
  }
}

export const actions = {
  fetchSongList({ commit }) {
    commit('updateListFetching', true)
    return this.$axios
      .$get(`/music/list/${appConfig.music.id}`)
      .then(response => {
        commit('updateListData', response.result)
        commit('updateListFetching', false)
        return response
      })
      .catch(error => {
        commit('updateListData', null)
        commit('updateListFetching', false)
        return Promise.reject(error)
      })
  },
  fetchSongLrc({ commit }, songID) {
    commit('updateLrcFetching', true)
    return this.$axios
      .$get(`/music/lrc/${songID}`)
      .then(response => {
        commit('updateLrcData', response.result)
        commit('updateLrcFetching', false)
        return response
      })
      .catch(error => {
        commit('updateLrcData', null)
        commit('updateLrcFetching', false)
        return Promise.reject(error)
      })
  },
  fetchSongUrl(_, songID) {
    return this.$axios.$get(`/music/url/${songID}`)
  }
}
