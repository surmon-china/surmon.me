/*
* 网站地图需要使用的文章数据状态
*/

export const state = {
  categories: {
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
  articles: {
    fetching: false,
    data: {
      result: {
        pagination: {
          current_page: 0
        },
        data: []
      }
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
    state.articles.data = action
  },
  SET_ARTICLE_DESCRIPTION_OPEN(state, { index }) {
    const article = state.articles.data.result.data[index]
    console.log(article)
    article.open = !article.open
  },
  REQUEST_CATEGORY(state) {
    state.categories.fetching = true
  },
  GET_CATEGORY_FAILURE(state) {
    state.categories.fetching = false
  },
  GET_CATEGORY_SUCCESS(state, action) {
    state.categories.fetching = false
    state.categories.data = action
  },
}
