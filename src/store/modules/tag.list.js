import {
	GET_TAG_LIST_SUCCESS,
	GET_TAG_LIST_FAILURE
} from '../types'

const state = {
  tags:[]
}

const mutations = {
  [GET_TAG_LIST_FAILURE](state) {
    state.tags = []
  },
  [GET_TAG_LIST_SUCCESS](state, action) {
    state.tags = action.tagList
  }
}

export default {
  state,
  mutations
}
