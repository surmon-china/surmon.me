import {
	COMMENT_LIST,
	SUCCESS_ADD_COMMENT,
	SUCCESS_ADD_REPLY,
	GET_COMMENT_LIST_FAILURE
} from '../types'

const state = {
  isFetching: false,
  items: []
}

const mutations = {
  [COMMENT_LIST](state,action){
    state.items = action.commentList
  },
  [SUCCESS_ADD_COMMENT](state,action){
    state.items.push(action.comment)
  },
  [SUCCESS_ADD_REPLY](state,action){
    state.items = state.items.map(item=>{
      if(item._id === action.cid){
        item.replys = action.replys
      }
      return item
    })
  },
  [GET_COMMENT_LIST_FAILURE](state){
    state.isFetching = false
    state.items = []
  }
}

export default {
  state,
  mutations
}