/**
 * @file Article state
 * @module store/article
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { SortType } from '/@/constants/state'
import { fetchDelay } from '/@/utils/fetch-delay'
import { IRootState } from '.'
import http from '/@/services/http'

export const ARTICLE_API_PATH = '/article'
export const LIKE_ARTICLE_API_PATH = '/like/article'

export enum ArticleModuleListMutations {
  // list
  SetListData = 'setListData',
  SetMoreListData = 'setMoreListData',
  SetListFetching = 'setListFetching',
  // hot list
  SetHotListData = 'setHotListData',
  SetHotListFetched = 'setHotListFetched',
  SetHotListFetching = 'setHotListFetching',
  // detail
  SetDetailData = 'setDetailData',
  SetDetailFetching = 'setDetailFetching',
  IncrementArticleLikes = 'IncrementArticleLikes'
}

export enum ArticleModuleActions {
  FetchList = 'fetchList',
  FetchHotList = 'fetchHotList',
  FetchDetail = 'fetchDetail',
  PostArticleLike = 'postArticleLike'
}

const getDefaultListData = () => ({
  data: [] as Array<$TODO>,
  pagination: null as $TODO
})

const state = () => ({
  hotList: {
    fetched: false,
    fetching: false,
    data: [] as Array<$TODO>
  },
  list: {
    fetching: false,
    data: getDefaultListData()
  },
  detail: {
    fetching: false,
    data: null as $TODO
  }
})

const mutations: MutationTree<ArticleState> = {
  // 文章列表
  [ArticleModuleListMutations.SetListFetching](state, fetching: boolean) {
    state.list.fetching = fetching
  },
  [ArticleModuleListMutations.SetListData](state, articleData) {
    state.list.data = articleData
  },
  [ArticleModuleListMutations.SetMoreListData](state, articleData) {
    state.list.data.data.push(...articleData.data)
    state.list.data.pagination = articleData.pagination
  },

  // 热门文章
  [ArticleModuleListMutations.SetHotListFetched](state, fetched: boolean) {
    state.hotList.fetched = fetched
  },
  [ArticleModuleListMutations.SetHotListFetching](state, fetching: boolean) {
    state.hotList.fetching = fetching
  },
  [ArticleModuleListMutations.SetHotListData](state, hotArticles) {
    state.hotList.data = hotArticles
  },

  // 文章详情
  [ArticleModuleListMutations.SetDetailFetching](state, fetching: boolean) {
    state.detail.fetching = fetching
  },
  [ArticleModuleListMutations.SetDetailData](state, article) {
    state.detail.data = article
  },

  // 喜欢某篇文章
  [ArticleModuleListMutations.IncrementArticleLikes](state) {
    const article = state.detail.data
    if (article) {
      article.meta.likes++
    }
  }
}

const actions: ActionTree<ArticleState, IRootState> = {
  // 获取文章列表
  [ArticleModuleActions.FetchList]({ commit }, params: any = {}) {
    const isRestart = !params.page || params.page === 1
    const isLoadMore = !isRestart && params.page > 1

    // 清空已有数据
    if (isRestart) {
      commit(ArticleModuleListMutations.SetListData, getDefaultListData())
    }
    commit(ArticleModuleListMutations.SetListFetching, true)

    return http
      .get<any>(ARTICLE_API_PATH, { params })
      .then(response => {
        commit(
          isLoadMore
            ? ArticleModuleListMutations.SetMoreListData
            : ArticleModuleListMutations.SetListData,
          response.result
        )
        return response
      })
      .finally(() => {
        commit(ArticleModuleListMutations.SetListFetching, false)
      })
  },

  // 获取最热文章列表
  [ArticleModuleActions.FetchHotList]({ state, commit }) {
    if (state.hotList.fetched) {
      return Promise.resolve(state.hotList.data)
    }
    commit(ArticleModuleListMutations.SetHotListFetching, true)
    return http
      .get(ARTICLE_API_PATH, { params: { cache: 1, sort: SortType.Hot } })
      .then(response => {
        commit(ArticleModuleListMutations.SetHotListData, response.result.data)
        commit(ArticleModuleListMutations.SetHotListFetched, true)
        return response
      })
      .finally(() => {
        commit(ArticleModuleListMutations.SetHotListFetching, false)
      })
  },

  // 获取文章详情
  [ArticleModuleActions.FetchDetail]({ commit }, params: any) {
    commit(ArticleModuleListMutations.SetDetailFetching, true)
    commit(ArticleModuleListMutations.SetDetailData, null)
    return http
      .get(`${ARTICLE_API_PATH}/${params.article_id}`)
      .then(response => {
        return new Promise(resolve => {
          fetchDelay(params.delay || 0)(() => {
            commit(ArticleModuleListMutations.SetDetailData, response.result)
            resolve(response)
          })
        })
      })
      .finally(() => {
        commit(ArticleModuleListMutations.SetDetailFetching, false)
      })
  },

  // 喜欢文章
  [ArticleModuleActions.PostArticleLike]({ commit }, article_id: string) {
    return http
      .patch(LIKE_ARTICLE_API_PATH, { article_id })
      .then(response => {
        commit(ArticleModuleListMutations.IncrementArticleLikes)
        return response
      })
  }
}

const articleModule: Module<ArticleState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export type ArticleState = ReturnType<typeof state>
export default articleModule
