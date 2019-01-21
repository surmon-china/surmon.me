/**
 * @file 文章数据状态 / ES module
 * @module store/article
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import { isBrowser } from '~/environment'
import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'
import { fetchDelay } from '~/utils/fetch-delay'

const getDefaultListData = () => {
  return {
    data: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    list: {
      fetching: false,
      data: getDefaultListData()
    },
    hotList: {
      fetching: false,
      data: []
    },
    detail: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {

  // 文章列表
  updateListFetchig(state, action) {
    state.list.fetching = action
  },
  updateListData(state, action) {
    state.list.data = action
  },
  updateExistingListData(state, action) {
    state.list.data.data.push(...action.data)
    state.list.data.pagination = action.pagination
  },

  // 热门文章
  updateHotListFetchig(state, action) {
    state.hotList.fetching = action
  },
  updateHotListData(state, action) {
    state.hotList.data = action.result.data
  },

  // 文章详情
  updateDetailFetchig(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.detail.data
    article && article.meta.likes++
  }
}

export const actions = {

  // 获取文章列表
  fetchList({ commit }, params = {}) {

    const isRestart = !params.page || params.page === 1
    const loadMore = params.page && params.page > 1

    // 清空已有数据
    isRestart &&
    commit('updateListData', getDefaultListData())
    commit('updateListFetchig', true)

    return this.$axios.$get(`/article`, { params })
      .then(response => {
        commit('updateListFetchig', false)
        loadMore
          ? commit('updateListData', response.result)
          : commit('updateExistingListData', response.result)
        if (loadMore && isBrowser) {
          Vue.nextTick(() => {
            scrollTo(
              window.scrollY + (window.innerHeight * 0.8),
              300,
              { easing: Easing['ease-in'] }
            )
          })
        }
      })
      .catch(error => commit('updateListFetchig', false))
  },

  // 获取最热文章列表
  fetchHotList({ commit, rootState }) {
    const { SortType } = rootState.global.constants
    commit('updateHotListFetchig', true)
    return this.$axios.$get(`/article`, { params: { cache: 1, sort: SortType.Hot }})
      .then(response => {
        commit('updateHotListData', response)
        commit('updateHotListFetchig', false)
      })
      .catch(error => commit('updateHotListFetchig', false))
  },

  // 获取文章详情
  fetchDetail({ commit }, params = {}) {
    const delay = fetchDelay(
      isBrowser && window.$nuxt.$route.name !== 'article-article_id' ? 0 : null
    )
    commit('updateDetailFetchig', true)
    commit('updateDetailData', {})
    return this.$axios.$get(`/article/${params.article_id}`)
      .then(response => {
        commit('updateDetailData', response.result)
        return new Promise(resolve => {
          delay(() => {
            commit('updateDetailFetchig', false)
            resolve(response)
          })
        }) 
      })
      .catch(error => {
        commit('updateDetailFetchig', false)
        return Promise.reject(error)
      })
  },

  // 喜欢文章
  fetchLikeArticle({ commit }, article_id) {
    return this.$axios.$patch(`/like/article`, { article_id })
      .then(response => {
        commit('updateLikesIncrement')
        return Promise.resolve(response)
      })
  }
}
