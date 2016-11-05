/*
*
* 主程序模块
*
*/

// Third Utils
window.store = require('store')
window.hljs = require('highlight.js')

// Style
import 'sass/app.scss'
import 'highlight.js/styles/agate.css'

// Libs
import Vue from 'vue'
import VueRouter from 'vue-router'

// config
import routes from './routes'
import stores from './store'

// App conponent
import App from './App'

// Components
import CodeMirror from 'vue-codemirror'
import VideoPlayer from 'vue-video-player'
import TouchRipple from 'vue-touch-ripple'
import AwesomeSwiper from 'vue-awesome-swiper'
import DuoShuo from 'components/common/vue-duoshuo'
import Loading from 'components/common/vue-loading'

// fiters
import filters from './filters'

// use fiters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// Duoshuo Config
DuoShuo.config({
  shortName: 'surmon-localhost',
  // unstable: true
})

VideoPlayer.config({
  youtube: false,
  switcher: false,
  hls: false
})

// app use
Vue.use(Loading)
Vue.use(DuoShuo)
Vue.use(VueRouter)
Vue.use(CodeMirror)
Vue.use(VideoPlayer)
Vue.use(TouchRipple)
Vue.use(AwesomeSwiper)

// 配置路由
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

// 路由拦截
router.beforeEach((route, redirect, next) => {
  next()
})

// start app
const app = new Vue({
  store: stores,
  router,
  render: h => h(App)
}).$mount('app')

