/*
*
* 评论数据状态
*
*/

export const state = {
  guestbook: {
    fetching: false,
    data: { 
      result: {}
    }
  },
  article: {
    fetching: false,
    data: { 
      result: {}
    }
  },
}

export const mutations = {
  REQUEST_LIST(state) {
    state.guestbook.fetching = true
  },
  GET_LIST_SUCCESS(state, action) {
    state.guestbook.fetching = false
    state.guestbook.data = action
  },
  GET_LIST_FAILURE(state) {
    state.guestbook.fetching = false
    state.guestbook.data = {
      result: {}
    }
  }
}
