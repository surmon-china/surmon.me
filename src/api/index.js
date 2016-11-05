import { Tag, Article } from './resources'

const TagArticles = require('./data/articles.tag')
const DateArticles = require('./data/articles.date')
const IndexArticles = require('./data/articles.index')
const CategoryArticles = require('./data/articles.category')

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
        let resData = IndexArticles
        if (params) {
          if (params.tag) resData = TagArticles
          if (params.date) resData = DateArticles
          if (params.category) resData = CategoryArticles
        }
        setTimeout(() => {
          resolve({ ok: true, data: { data: resData }})
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
