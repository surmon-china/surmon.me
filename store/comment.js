/**
 * @file 评论数据状态 / ES module
 * @module store/comment
 * @author Surmon <https://github.com/surmon-china>
 */

import { fetchDelay } from '~/services/fetch-delay'

export const COMMENT_API_PATH = '/comment'
export const LIKE_COMMENT_API_PATH = '/like/comment'

const getDefaultListData = () => {
  return {
    data: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: getDefaultListData()
  }
}

export const mutations = {
  // 请求列表
  updateListFetchig(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action
  },
  clearListData(state) {
    state.data = getDefaultListData()
  },

  // 发布评论
  updatePostFetchig(state, action) {
    state.posting = action
  },
  updateListNewItemData(state, action) {
    state.data.pagination.total += 1
    state.data.data.push(action.result)
  },

  // 喜欢某条评论
  updateLikesIncrement(state, action) {
    state.data.data.find(comment => {
      const isMatched = comment.id === action.id
      isMatched && comment.likes++
      return isMatched
    })
  }
}

export const actions = {
  fetchList({ commit, rootState }, params = {}) {
    const { SortType } = rootState.global.constants

    // 修正参数
    params = Object.assign(
      {
        page: 1,
        per_page: 88,
        sort: SortType.Desc
      },
      params
    )

    const isRestart = params.page === 1
    const isDescSort = params.sort === SortType.Desc

    // 清空数据
    isRestart && commit('updateListData', getDefaultListData())
    commit('updateListFetchig', true)

    const delay = fetchDelay()

    return this.$axios
      .$get(COMMENT_API_PATH, { params })
      .then(response => {
        isDescSort && response.result.data.reverse()
        delay(() => {
          commit('updateListData', response.result)
          commit('updateListFetchig', false)
        })
      })
      .catch(error => commit('updateListFetchig', false))
  },

  // 发布评论
  fetchPostComment({ commit }, comment) {
    commit('updatePostFetchig', true)
    return this.$axios
      .$post(COMMENT_API_PATH, comment)
      .then(response => {
        commit('updateListNewItemData', response)
        commit('updatePostFetchig', false)
        return Promise.resolve(response)
      })
      .catch(error => {
        commit('updatePostFetchig', false)
        return Promise.reject(error)
      })
  },

  // 喜欢评论
  fetchLikeComment({ commit }, comment) {
    return this.$axios
      .$patch(LIKE_COMMENT_API_PATH, { comment_id: comment.id })
      .then(response => {
        commit('updateLikesIncrement', comment)
        return Promise.resolve(response)
      })
  }
}
