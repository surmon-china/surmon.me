/**
 * @file Archive state
 * @module store/archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import nodepress from '../services/nodepress'
import { ARTICLE_API_PATH } from './article'
import { IRootState } from '.'

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
  }
}

const actions: ActionTree<ArchiveState, IRootState> = {
  [ArchiveModuleActions.FetchArticles]({ state, commit }, params = {}) {
    if (state.articles.data.length) {
      return Promise.resolve(state.articles.data)
    }
    commit(ArchiveModuleMutations.SetArticlesFetching, true)
    return nodepress
      .get(ARTICLE_API_PATH, { params: { per_page: 666, ...params }})
      .then(response => {
        commit(ArchiveModuleMutations.SetArticlesData, response.result.data)
        return response.result.data
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
