/**
 * @file Sitemap
 * @module store/sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import http from '/@/services/http'
import { ARTICLE_API_PATH } from './article'
import { IRootState } from '.'

export enum SitemapModuleMutations {
  SetArticlesFetching = 'setArticlesFetching',
  SetArticlesData = 'setArticlesData'
}
export enum SitemapModuleActions {
  FetchArticles = 'fetchArticles'
}

const state = () => ({
  articles: {
    fetching: false,
    data: [] as Array<$TODO>
  }
})

const mutations: MutationTree<SitemapState> = {
  [SitemapModuleMutations.SetArticlesFetching](state, fetching: boolean) {
    state.articles.fetching = fetching
  },
  [SitemapModuleMutations.SetArticlesData](state, result) {
    state.articles.data = result.data
  },
  // TODO: 应该在消费方实现
  // setArticleOpenState(state, index, open) {
  //   const article = state.articles.data[index]
  //   if (article) {
  //     Vue.set(article, 'open', open != null ? open : !article.open)
  //   }
  // }
}

const actions: ActionTree<SitemapState, IRootState> = {
  [SitemapModuleActions.FetchArticles]({ commit }, params) {
    commit(SitemapModuleMutations.SetArticlesFetching, true)
    return http
      .get(ARTICLE_API_PATH, { params })
      .then(response => {
        commit(SitemapModuleMutations.SetArticlesData, response.result)
        return response
      })
      .finally(() => {
        commit(SitemapModuleMutations.SetArticlesFetching, false)
      })
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
