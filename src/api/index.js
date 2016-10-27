import { TagResource } from './resources'

export default {

  // 标签相关
  tag: {
    getList(params) {
      // return TagResource.get({}, params)
      return new Promise((resolve, reject) => { resolve({ ok: true, data: { data: require('./data/tags') } })})
    }
  },

  // 文章相关
  article: {

  }
}
