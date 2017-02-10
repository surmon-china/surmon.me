/*
*
* 评论数据状态
*
*/

export const state = {
  fetching: false,
  data: { 
    result: {}
  }
}

export const mutations = {
  REQUEST_LIST(state) {
    state.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.fetching = false
    state.data = {
      result: {}
    }
  },
  GET_LIST_SUCCESS(state, action) {
    state.fetching = false
    state.data = action
  }
}
