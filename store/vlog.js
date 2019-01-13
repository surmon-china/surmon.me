/**
 * @file Vlog 项目数据状态 / ES module
 * @module store/vlog
 * @author Surmon <https://github.com/surmon-china>
 */

export const state = () => {
  return {
    videos: {
      fetching: false,
      data: {
        vlist: []
      }
    }
  }
}

export const mutations = {
  updateRepositoriesFetching(state, action) {
    state.repositories.fetching = action
  },
  updateRepositoriesData(state, action) {
    state.repositories.data = action.result
      .filter(repo => !repo.description || !repo.description.startsWith('#'))
      .sort((prev, next) => next.stargazers_count - prev.stargazers_count)
  },
}

export const actions = {

  // 获取开源项目列表
  fetchRepositories({ commit, state }) {

    // 如果数据已存在，则直接返回 Promise 成功，并返回数据
    if (state.repositories.data.length) {
      return Promise.resolve(state.project.repositories.data)
    }

    // 不存在则请求新数据
    commit('updateRepositoriesFetching', true)
    return this.$axios.$get('/expansion/github')
      .then(response => {
        commit('updateRepositoriesData', response)
        commit('updateRepositoriesFetching', false)
      })
      .catch(error => commit('updateRepositoriesFetching', false))
  },
}
