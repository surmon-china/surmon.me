/*
*
* 网站地图需要使用的文章数据状态
*
*/

export const state = () => {
  return {
    articles: {
      fetching: false,
      data: { data: [] }
    }
  }
}

export const mutations = {
  REQUEST_ARTICLES(state) {
    state.articles.fetching = true
  },
  GET_ARTICLES_FAILURE(state) {
    state.articles.fetching = false
  },
  GET_ARTICLES_SUCCESS(state, action) {
    state.articles.fetching = false
    state.articles.data = action.result
  }
}
