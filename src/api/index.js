import { Tag, Article } from './resources'

export default {

  // 标签相关
  tag: {
    getList(params) {
      // return Tag.get({}, params)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true, data: { data: require('./data/tags') } })
        }, 1500)
      })
    }
  },

  // 文章相关
  article: {
    getList(params) {
      // return Article.get({}, params)
      return new Promise((resolve, reject) => { resolve({ ok: true, data: { data: require('./data/articles') } })})
    },
    getHot(params) {
      // return Article.get({}, params)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ok: true, data: { data: require('./data/articles.hot') } })
        }, 1500)
      })
    },
    getItem(params) {
      return Article.get({ id: params.id }, params)
      // return new Promise((resolve, reject) => { resolve({ ok: true, data: { data: require('./data/article') } })})
    }
  }
}
