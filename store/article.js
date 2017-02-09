/*
*
* 文章数据状态
*
*/

export const state = {
  hot: {
    fetching: false,
    data: { response: [] }
  },
  list: {
    fetching: false,
    data: {
      result: {
        pagination: {
          current_page: 0
        },
        data: []
      }
    }
  },
  detail: {
    fetching: false,
    data: {
      result: {}
    }
  }
}

export const mutations = {

  // List
  CLEAR_LIST(state) {
    state.list.data = {
      result: {
        pagination: {
          current_page: 0
        },
        data: []
      }
    }
  },
  REQUEST_LIST(state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data = action
  },
  ADD_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data.result.data.push.apply(state.list.data.result.data, action.result.data)
    state.list.data.result.pagination = action.result.pagination
  },

  // Hot
  REQUEST_HOT_LIST(state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE(state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS(state, action){
    state.hot.fetching = false
    state.hot.data = action
  },

  // Detail
  CLEAR_DETAIL(state) {
    state.detail.data = {
      result: {}
    }
  },
  REQUEST_DETAIL(state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE(state) {
    state.detail.fetching = false
    state.detail.data = { result: {} }
  },
  GET_DETAIL_SUCCESS(state, action) {
    state.detail.fetching = false
    state.detail.data = action
  }
}
