/**
 * @file 网站地图需要使用的文章数据状态 / ES module
 * @module store/sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import { ARTICLE_API_PATH } from './article'

export const state = () => {
  return {
    articles: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  updateArticleListFetching(state, action) {
    state.articles.fetching = action
  },
  updateArticleListData(state, result) {
    state.articles.data = result.data
  },
  updateArticleOpenState(state, index, open) {
    const article = state.articles.data[index]
    if (article) {
      Vue.set(article, 'open', open != null ? open : !article.open)
    }
  }
}

export const actions = {
  // 获取地图文章列表
  fetchArticles({ commit }, params) {
    commit('updateArticleListFetching', true)
    return this.$axios
      .$get(ARTICLE_API_PATH, { params })
      .then(response => {
        commit(`updateArticleListData`, response.result)
        commit('updateArticleListFetching', false)
      })
      .catch(error => {
        console.warn('HTTP Sitemap filed:', error)
        commit('updateArticleListFetching', false)
      })
  }
}
