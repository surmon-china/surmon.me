import {
	ARTICLE_DETAIL,
	TOGGLE_LIKE
} from '../types'

const state = {
  item:{}
}

const mutations = {
  [ARTICLE_DETAIL](state,action){
    state.item = {...state.item, ...action.articleDetail }
  },
  [TOGGLE_LIKE](state,action){
    state.item = {...state.item, isLike:action.isLike, like_count: action.like_count}
  }
}

export default {
  state,
  mutations
}