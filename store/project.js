/*
*
* 项目/github数据状态
*
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
    const newRepositories = action.result
    .filter(rep => (!rep.description || !rep.description.startsWith('#')))
    .map(rep => {
      return {
        html_url: rep.html_url,
        name: rep.name || ' ',
        fork: rep.fork,
        forks: rep.forks,
        is_private: rep.private,
        forks_count: rep.forks_count,
        description: rep.description || ' ',
        open_issues_count: rep.open_issues_count,
        stargazers_count: rep.stargazers_count,
        created_at: rep.created_at,
        language: rep.language
      }
    })
    // console.log(newRepositories)
    state.repositories.data = newRepositories
  },
  REQUEST_GUTHUB_REPOSITORIES_FAILURE(state) {
    state.repositories.fetching = false
    state.repositories.data = {}
  }
}
