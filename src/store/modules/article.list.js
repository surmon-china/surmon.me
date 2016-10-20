import {
	ARTICLE_LIST,
	ADD_ARTICLE_LIST,
	REQUEST_ARTICLE_LIST,
	GET_ARTICLE_LIST_FAILURE
} from '../types'

const state = {
  isFetching: false,
  isMore: true,
  items: []
}

const mutations = {
  [REQUEST_ARTICLE_LIST](state){
    state.isFetching = true
  },
  [ARTICLE_LIST](state,action){
    state.isFetching = false
    state.isMore = action.isMore
    state.items = action.articleList
  },
  [GET_ARTICLE_LIST_FAILURE](state){
    state.isFetching = false
  },
  [ADD_ARTICLE_LIST](state,action){
    state.isFetching = false
    state.isMore = action.isMore
    state.items = [...state.items, ...action.articleList]
  }
}

export default {
  state,
  mutations
}