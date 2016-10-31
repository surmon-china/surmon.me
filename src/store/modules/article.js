import {

  // List
  REQUEST_ARTICLE_LIST,
  GET_ARTICLE_LIST_FAILURE,
  GET_ARTICLE_LIST_SUCCESS,

  // Hot
  REQUEST_ARTICLE_HOT_LIST,
  GET_ARTICLE_HOT_LIST_FAILURE,
  GET_ARTICLE_HOT_LIST_SUCCESS,

  // Detail
  REQUEST_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_FAILURE,
  GET_ARTICLE_DETAIL_SUCCESS

} from '../types'

const state = {
  hot: {
    fetching: false,
    items: []
  },
  list: {
    fetching: false,
    items: []
  },
  detail: {
    fetching: false,
    data: {}
  }
}

const mutations = {

  // List
  [REQUEST_ARTICLE_LIST](state) {
    state.list.fetching = true
  },
  [GET_ARTICLE_LIST_FAILURE](state) {
    state.list.fetching = false
  },
  [GET_ARTICLE_LIST_SUCCESS](state, action){
    state.list.fetching = false
    state.list.items = [...state.list.items, ...action.list]
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
    state.hot.items = action.list
  },

  // Detail
  [REQUEST_ARTICLE_DETAIL](state) {
    state.detail.fetching = true
  },
  [GET_ARTICLE_DETAIL_FAILURE](state) {
    state.detail.fetching = false
  },
  [GET_ARTICLE_DETAIL_SUCCESS](state, action){
    state.detail.fetching = false
    state.detail.data = action.detail
  }
}

export default {
  state,
  mutations
}
