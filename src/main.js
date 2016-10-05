/*
*
* 主程序模块
*
*/

// Bootstrap
import 'sass/bootstrap.scss'


// Libs
import Vue from 'vue'
import VueRouter from 'vue-router'

// config
import routerMap from './routerMap'

// App conponent
import App from './App'

// Components
import awesomeSwiper from 'components/common/vue-awesome-swiper'

// app use
Vue.use(VueRouter)
Vue.use(awesomeSwiper)


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
}).$mount('app')

