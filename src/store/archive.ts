/**
 * @file Archive
 * @module store/archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { ARTICLE_API_PATH } from './article'
import { IRootState } from '.'
import http from '/@/services/http'

export enum ArchiveModuleMutations {
  SetArticlesFetching = 'setArticlesFetching',
  SetArticlesData = 'setArticlesData'
}
export enum ArchiveModuleActions {
  FetchArticles = 'fetchArticles'
}

const state = () => ({
  articles: {
    fetching: false,
    data: [] as Array<$TODO>
  }
})

const mutations: MutationTree<ArchiveState> = {
  [ArchiveModuleMutations.SetArticlesFetching](state, fetching: boolean) {
    state.articles.fetching = fetching
  },
  [ArchiveModuleMutations.SetArticlesData](state, data) {
    state.articles.data = data
  },
  // TODO: 应该在消费方实现
  // setArticleOpenState(state, index, open) {
  //   const article = state.articles.data[index]
  //   if (article) {
  //     Vue.set(article, 'open', open != null ? open : !article.open)
  //   }
  // }
}

const actions: ActionTree<ArchiveState, IRootState> = {
  [ArchiveModuleActions.FetchArticles]({ commit }, params) {
    commit(ArchiveModuleMutations.SetArticlesFetching, true)
    return http
      .get(ARTICLE_API_PATH, { params })
      .then(response => {
        commit(ArchiveModuleMutations.SetArticlesData, response.result.data)
        return response
      })
      .finally(() => {
        commit(ArchiveModuleMutations.SetArticlesFetching, false)
      })
  }
}

const archiveModule: Module<ArchiveState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type ArchiveState = ReturnType<typeof state>
export default archiveModule
