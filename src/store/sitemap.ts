/**
 * @file Sitemap
 * @module store/sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '.'
// import { ARTICLE_API_PATH } from './article'
import http from '/@/services/http'

export const ARTICLE_API_PATH = '/article'

export enum SitemapModuleMutations {
  UpdateArticleFetching = 'updateArticleFetching',
  UpdateArticlesData = 'updateArticlesData'
}
export enum SitemapModuleActions {
  FetchArticles = 'fetchArticles'
}

const state = () => ({
  articles: {
    fetching: false,
    data: [] as $TODO[]
  }
})

const mutations: MutationTree<SitemapState> = {
  [SitemapModuleMutations.UpdateArticleFetching](state, action) {
    state.articles.fetching = action
  },
  [SitemapModuleMutations.UpdateArticlesData](state, result) {
    state.articles.data = result.result.data
  },
  // TODO: 应该在消费方实现
  // updateArticleOpenState(state, index, open) {
  //   const article = state.articles.data[index]
  //   if (article) {
  //     Vue.set(article, 'open', open != null ? open : !article.open)
  //   }
  // }
}

const actions: ActionTree<SitemapState, IRootState> = {
  [SitemapModuleActions.FetchArticles]({ commit }, params) {
    commit(SitemapModuleMutations.UpdateArticleFetching, true)
    return http
      .get(ARTICLE_API_PATH, { params })
      .then(response => commit(SitemapModuleMutations.UpdateArticlesData, response))
      .finally(() => commit(SitemapModuleMutations.UpdateArticleFetching, false))
  }
}

const sitemapModule: Module<SitemapState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type SitemapState = ReturnType<typeof state>
export default sitemapModule
