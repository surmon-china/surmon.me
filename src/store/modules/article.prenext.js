import { PRENEXT_ARTICLE } from '../types'

const state = {
  next:{},
  prev:{}
}

const mutations = {
  [PRENEXT_ARTICLE](state,action){
    state.prev = action.prenextArticle.prev || {}
    state.next = action.prenextArticle.next || {}
  }
}

export default {
  state,
  mutations
}