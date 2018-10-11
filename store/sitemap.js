/**
 * @file 网站地图需要使用的文章数据状态 / ES module
 * @module store/sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'

export const state = () => {
  return {
    articles: {
      fetching: false,
      data: { data: [] }
    }
  }
}

export const mutations = {
  REQUEST_ARTICLES(state) {
    state.articles.fetching = true
  },
  GET_ARTICLES_FAILURE(state) {
    state.articles.fetching = false
  },
  GET_ARTICLES_SUCCESS(state, action) {
    state.articles.fetching = false
    state.articles.data = action.result
  },
  TOGGLE_ARTICLE_OPEN(state, index) {
    const article = state.articles.data.data[index]
    if (article) {
      Vue.set(article, 'open', !article.open)
    }
  }
}
