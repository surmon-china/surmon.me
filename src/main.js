/*
*
* 主程序模块
*
*/

// Bootstrap
import 'sass/app.scss'


// Libs
import Vue from 'vue'
import VueRouter from 'vue-router'

// config
import routes from './routes'
import store from './store'

// App conponent
import App from './App'

// Components
import CodeMirror from 'vue-codemirror'
import VideoPlayer from 'vue-video-player'
import TouchRipple from 'vue-touch-ripple'
import AwesomeSwiper from 'vue-awesome-swiper'
import DuoShuo from 'components/common/vue-duoshuo'

DuoShuo.config({
  shortName: 'surmon-localhost',
  // unstable: true
})

// app use
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

  // 是否需要通栏
  /*
  const fullPage = route.matched.some(m => m.meta.fullPage)
  if (fullPage) {
    console.log('需要全屏显示', this)
  }
  */
  next()
})

// start app
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('app')

