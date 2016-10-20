import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 全局配置
import options from './modules/options'

// import middlewares from './middlewares'
// import apps from './modules/apps'
// import articleList from './modules/article.list'
// import prenextArticle from './modules/article.prenext'
// import articleDetail from './modules/article.detail'
// import auth from './modules/auth'
// import commentList from './modules/comment.list'
// import globalVal from './modules/global.val'
// import logins from './modules/logins'
// import tagList from './modules/tag.list'

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
  modules: {
    options,
    // apps,
    // articleList,
    // prenextArticle,
    // articleDetail,
    // auth,
    // commentList,
    // globalVal,
    // logins,
    // tagList
  },
  strict: debug,
  // middlewares
})
