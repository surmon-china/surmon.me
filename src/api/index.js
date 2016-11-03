import { Tag, Article } from './resources'

export default {

  // 标签相关
  tag: {
    getList(params) {
      // return Tag.get({}, params)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true, data: { data: require('./data/tags.list') } })
        }, 1000)
      })
    }
  },

  // 文章相关
  article: {
    getList(params) {
      // return Article.get({}, params)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true, data: { data: require('./data/articles.list') } })
        }, 1800)
      })
    },
    getHot(params) {
      // return Article.get({}, params)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true, data: { data: require('./data/articles.hot') } })
        }, 2000)
      })
    },
    getItem(params) {
      // return Article.get({ id: params.id }, params)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true, data: { data: require('./data/article') } })
        }, 600)
      })
    }
  }
}
