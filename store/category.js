/*
*
* 分类数据状态
*
*/

export const state = {
  fetching: false,
  data: {
    result: {
      data: []
    }
  }
}

export const mutations = {
  REQUEST_LIST(state) {
    state.fetching = true
  },
  GET_LIST_SUCCESS(state, action) {
    state.fetching = false
    state.data = action
  },
  GET_LIST_FAILURE(state) {
    state.fetching = false
    state.data = {
      result: {
        data: []
      }
    }
  }
}
