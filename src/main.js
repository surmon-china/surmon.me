
// Libs
import Vue from 'vue'
import VueRouter from 'vue-router'

// config
import routerMap from './routerMap'

// App conponent
import App from './App'

// app use
Vue.use(VueRouter)


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

