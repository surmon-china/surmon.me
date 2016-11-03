import {

  // List
  CLEAR_ARTICLE_LIST,
  REQUEST_ARTICLE_LIST,
  GET_ARTICLE_LIST_FAILURE,
  GET_ARTICLE_LIST_SUCCESS,

  // Hot
  REQUEST_ARTICLE_HOT_LIST,
  GET_ARTICLE_HOT_LIST_FAILURE,
  GET_ARTICLE_HOT_LIST_SUCCESS,

  // Detail
  CLEAR_ARTICLE_DETAIL,
  REQUEST_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_FAILURE,
  GET_ARTICLE_DETAIL_SUCCESS

} from '../types'

const state = {
  hot: {
    fetching: false,
    data: {}
  },
  list: {
    fetching: false,
    data: {
      data: []
    }
  },
  detail: {
    fetching: false,
    data: {}
  }
}

const mutations = {

  // List
  [CLEAR_ARTICLE_LIST](state) {
    state.list.data = { data: [] }
  },
  [REQUEST_ARTICLE_LIST](state) {
    state.list.fetching = true
  },
  [GET_ARTICLE_LIST_FAILURE](state) {
    state.list.fetching = false
  },
  [GET_ARTICLE_LIST_SUCCESS](state, action){
    state.list.fetching = false
    const newArticleList = [...state.list.data.data, ...action.data.data]
    state.list.data = action.data
    state.list.data.data = newArticleList
  },

  // Hot
  [REQUEST_ARTICLE_HOT_LIST](state) {
    state.hot.fetching = true
  },
  [GET_ARTICLE_HOT_LIST_FAILURE](state) {
    state.hot.fetching = false
  },
  [GET_ARTICLE_HOT_LIST_SUCCESS](state, action){
    state.hot.fetching = false
    state.hot.data = action.data
  },

  // Detail
  [CLEAR_ARTICLE_DETAIL](state) {
    state.detail.data = {}
  },
  [REQUEST_ARTICLE_DETAIL](state) {
    state.detail.fetching = true
  },
  [GET_ARTICLE_DETAIL_FAILURE](state) {
    state.detail.fetching = false
  },
  [GET_ARTICLE_DETAIL_SUCCESS](state, action){
    state.detail.fetching = false
    state.detail.data = action.data
  }
}

export default {
  state,
  mutations
}
