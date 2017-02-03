export const state = {
  fetching: false,
  data: {
    result: {
      data: []
    }
  }
}

export const mutations = {
  REQUEST_TAG_LIST(state) {
    state.fetching = true
  },
  GET_TAG_LIST_FAILURE(state) {
    state.fetching = false
    state.data = {
      result: {
        data: []
      }
    }
  },
  GET_TAG_LIST_SUCCESS(state, action) {
    state.fetching = false
    state.data = action.data
  }
}
