import Vue from 'vue'
import Vuex from 'vuex'

// Use
Vue.use(Vuex)

// debug
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

// 全局配置
import options from './modules/options'

// Tags数据
import tag from './modules/tag'

// import apps from './modules/apps'
// import articleList from './modules/article.list'
// import prenextArticle from './modules/article.prenext'
// import articleDetail from './modules/article.detail'
// import auth from './modules/auth'
// import commentList from './modules/comment.list'
// import globalVal from './modules/global.val'
// import logins from './modules/logins'

// Actions
import actions from './actions'

export default new Vuex.Store({
  modules: {
    options,
    tag
    // apps,
    // articleList,
    // prenextArticle,
    // articleDetail,
    // auth,
    // commentList,
    // globalVal,
    // logins,
  },
  actions,
  strict: true
})
