/**
 * @file Article
 * @module store/article
 * @author Surmon <https://github.com/surmon-china>
 */

// TODO!!!
import { Module, MutationTree, ActionTree } from 'vuex'
import { isClient } from '/@/vuniversal/env'
import { isArticleDetail } from '/@/transforms/route'
import { fetchDelay } from '/@/utils/fetch-delay'
import { scrollTo, Easing } from '/@/utils/scroller'
import { IRootState } from '.'
import http from '/@/services/http'

export const ARTICLE_API_PATH = '/article'
export const LIKE_ARTICLE_API_PATH = '/like/article'

export enum ArticleModuleMutations {
  UpdateFetching = 'updateFetching',
  UpdateListData = 'updateListData'
}
export enum ArticleModuleActions {
  FetchList = 'fetchList'
}

const getDefaultListData = () => {
  return {
    data: [] as Array<$TODO>,
    pagination: {} as $TODO
  }
}

const state = () => ({
  list: {
    fetching: false,
    data: getDefaultListData()
  },
  hotList: {
    fetching: false,
    data: [] as Array<$TODO>
  },
  detail: {
    fetching: false,
    data: {} as $TODO
  }
})

const mutations: MutationTree<ArticleState> = {
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

  // 更新文章阅读全文状态
  updateDetailRenderedState(state, action) {
    Vue.set(
      state.detail.data,
      'isRenderedFullContent',
      action == null ? true : action
    )
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.detail.data
    article && article.meta.likes++
  }
}

const actions: ActionTree<ArticleState, IRootState> = {
  // 获取文章列表
  fetchList({ commit }, params = {}) {
    const isRestart = !params.page || params.page === 1
    const isLoadMore = params.page && params.page > 1

    // 清空已有数据
    isRestart && commit('updateListData', getDefaultListData())
    commit('updateListFetchig', true)

    return http
      .get(ARTICLE_API_PATH, { params })
      .then(response => {
        commit('updateListFetchig', false)
        isLoadMore
          ? commit('updateExistingListData', response.result)
          : commit('updateListData', response.result)
        if (isLoadMore && isClient) {
          Vue.nextTick(() => {
            scrollTo(window.scrollY + window.innerHeight * 0.8, 300, {
              easing: Easing['ease-in']
            })
          })
        }
      })
      .catch(error => commit('updateListFetchig', false))
  },

  // 获取最热文章列表
  fetchHotList({ commit, rootState }) {
    const { SortType } = rootState.global.constants
    commit('updateHotListFetchig', true)
    return http
      .get(ARTICLE_API_PATH, { params: { cache: 1, sort: SortType.Hot } })
      .then(response => {
        commit('updateHotListData', response)
        commit('updateHotListFetchig', false)
      })
      .catch(error => commit('updateHotListFetchig', false))
  },

  // 获取文章详情
  fetchDetail({ commit }, params = {}) {
    const delay = fetchDelay(
      isClient && isArticleDetail(window.$nuxt.$route.name) ? null : 0
    )
    if (isClient) {
      Vue.nextTick(() => {
        scrollTo(0, 300, { easing: Easing['ease-in'] })
      })
    }
    commit('updateDetailFetchig', true)
    commit('updateDetailData', {})
    return http
      .get(`${ARTICLE_API_PATH}/${params.article_id}`)
      .then(response => {
        return new Promise(resolve => {
          delay(() => {
            commit('updateDetailData', response.result)
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
    return http
      .patch(LIKE_ARTICLE_API_PATH, { article_id })
      .then(response => {
        commit('updateLikesIncrement')
        return Promise.resolve(response)
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
