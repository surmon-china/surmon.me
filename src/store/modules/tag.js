import {
	GET_TAG_LIST_SUCCESS,
	GET_TAG_LIST_FAILURE
} from '../types'

const state = {
  list: []
}

const mutations = {
  [GET_TAG_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_TAG_LIST_SUCCESS](state, action) {
    state.list = action.tagList
  }
}

export default {
  state,
  mutations
}
