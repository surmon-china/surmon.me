import {
	GET_TAG_LIST_SUCCESS,
	GET_TAG_LIST_FAILURE
} from '../types'

import { getTagList } from '../actions'

console.log(getTagList)

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

const actions = {
  getTagList
}

export default {
  state,
  actions,
  mutations
}
