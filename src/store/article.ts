/**
 * @file Article
 * @module store/article
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, ActionTree } from 'vuex'
import { SortType } from '/@/constants/state'
import { isClient } from '/@/vuniversal/env'
import { isArticleDetail } from '/@/transforms/route'
import { fetchDelay } from '/@/utils/fetch-delay'
import { scrollTo, Easing } from '/@/utils/scroller'
import { IRootState } from '.'
import http from '/@/services/http'

export const ARTICLE_API_PATH = '/article'
export const LIKE_ARTICLE_API_PATH = '/like/article'

export enum ArticleModuleListMutations {
  // list
  SetListData = 'setListData',
  SetMoreListData = 'setMoreListData',
  SetListFetchig = 'setListFetchig',
  // hot list
  SetHotListData = 'setHotListData',
  SetHotListFetched = 'setHotListFetched',
  // detail
  SetDetailData = 'setDetailData',
  SetDetailFetchig = 'setDetailFetchig',
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
  [ArticleModuleListMutations.SetListFetchig](state, fetching: boolean) {
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
  [ArticleModuleListMutations.SetHotListData](state, hotArticles) {
    state.hotList.data = hotArticles
  },

  // 文章详情
  [ArticleModuleListMutations.SetDetailFetchig](state, fetching: boolean) {
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
    commit(ArticleModuleListMutations.SetListFetchig, true)

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
        /*
        if (isLoadMore && isClient) {
          Vue.nextTick(() => {
            scrollTo(window.scrollY + window.innerHeight * 0.8, 300, {
              easing: Easing['ease-in']
            })
          })
        }
        */
      })
      .finally(() => {
        commit(ArticleModuleListMutations.SetListFetchig, false)
      })
  },

  // 获取最热文章列表
  [ArticleModuleActions.FetchHotList]({ state, commit }) {
    if (state.hotList.fetched) {
      return Promise.resolve(state.hotList.data)
    }
    return http
      .get(ARTICLE_API_PATH, { params: { cache: 1, sort: SortType.Hot } })
      .then(response => {
        commit(ArticleModuleListMutations.SetHotListData, response.result.data)
        commit(ArticleModuleListMutations.SetHotListFetched, true)
        return response
      })
  },

  // 获取文章详情
  [ArticleModuleActions.FetchDetail]({ commit }, params: any) {
    // 到顶部？也许是不必要的
    // if (isClient) {
    //   Vue.nextTick(() => {
    //     scrollTo(0, 300, { easing: Easing['ease-in'] })
    //   })
    // }
    // const delay = fetchDelay(
    //   isClient && isArticleDetail(window.$nuxt.$route.name) ? null : 0
    // )
    params.delay = params.delay || 0
    const delay = fetchDelay(params.delay)

    commit(ArticleModuleListMutations.SetDetailFetchig, true)
    commit(ArticleModuleListMutations.SetDetailData, null)
    return http
      .get(`${ARTICLE_API_PATH}/${params.article_id}`)
      .then(response => {
        return new Promise(resolve => {
          delay(() => {
            commit(ArticleModuleListMutations.SetDetailData, response.result)
            resolve(response)
          })
        })
      })
      .finally(() => {
        commit(ArticleModuleListMutations.SetDetailFetchig, false)
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
