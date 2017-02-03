import Vue from 'vue'
import Vuex from 'vuex'

// Use
Vue.use(Vuex)

// debug
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

// global options
import options from './modules/options'

// modules
import tag from './modules/tag'
import article from './modules/article'


// Actions
import actions from './actions'

export default new Vuex.Store({
  modules: {
    options,
    tag,
    article
  },
  actions,
  strict: true
})
