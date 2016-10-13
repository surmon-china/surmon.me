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
import routerMap from './routerMap'

// App conponent
import App from './App'

// Components
import AwesomeSwiper from 'vue-awesome-swiper'
import CodeMirror from 'vue-codemirror'
import VideoPlayer from 'vue-video-player'
import TouchRipple from 'vue-touch-ripple'

// app use
Vue.use(VueRouter)
Vue.use(AwesomeSwiper)
Vue.use(CodeMirror)
Vue.use(VideoPlayer)
Vue.use(TouchRipple)

// 配置路由
const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  },
  routes: routerMap
})

// start app
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('body')

