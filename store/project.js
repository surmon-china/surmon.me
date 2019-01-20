/**
 * @file Github 项目数据状态 / ES module
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
  updateRepositoriesFetching(state, action) {
    state.repositories.fetching = action
  },
  updateRepositoriesData(state, action) {
    state.repositories.data = action
      .filter(repo => !repo.fork && (!repo.description || !repo.description.startsWith('#')))
      .sort((prev, next) => next.stargazers_count - prev.stargazers_count)
  },
}

export const actions = {

  // 获取开源项目列表
  fetchRepositories({ commit, state }) {

    // 如果数据已存在，则直接返回
    if (state.repositories.data.length) {
      return Promise.resolve(state.repositories.data)
    }

    // 不存在则请求新数据
    commit('updateRepositoriesFetching', true)
    return this.$axios.$get('/expansion/github')
      .then(response => {
        commit('updateRepositoriesData', response.result)
        commit('updateRepositoriesFetching', false)
      })
      .catch(error => commit('updateRepositoriesFetching', false))
  },
}
