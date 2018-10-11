/**
 * @file 项目/Github数据状态 / ES module
 * @module store/project
 * @author Surmon <https://github.com/surmon-china>
 */

export const state = () => {
  return {
    repositories: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  REQUEST_GUTHUB_REPOSITORIES(state) {
    state.repositories.fetching = true
  },
  REQUEST_GUTHUB_REPOSITORIES_SUCCESS(state, action) {
    state.repositories.fetching = false
    state.repositories.data = action.result.filter(rep => {
      return !rep.description || !rep.description.startsWith('#')
    }).sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })
  },
  REQUEST_GUTHUB_REPOSITORIES_FAILURE(state) {
    state.repositories.fetching = false
    state.repositories.data = {}
  }
}
