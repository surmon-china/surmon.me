/*
*
* 主程序模块
*
*/

// Bootstrap
import './sass/bootstrap.scss'

// Vue主程序
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './appRouter'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

// 将路由状态同步至vuex，并注册状态
sync(store, router)

Vue.transition('fadeIn', {
  type: 'animation',
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})
Vue.transition('updown', {
  type: 'animation',
  enterClass: 'bounce',
  leaveClass: 'bounce'
})
Vue.transition('updown', {
  type: 'animation',
  enterClass: 'bounceInDown',
  leaveClass: 'bounceOutUp'
})

// 注册全局过滤器，(name obj)
// 注册过滤器 && directives
Object.keys(filters).forEach(i => Vue.filter(i, filters[i]))
// Object.keys(directives).forEach(i => Vue.directive(i, directives[i]))

// 创建应用实例，并注入 Service && 路由 给所有子组件
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  router,
  store,
  ...App
})

// 暴露app模块，被其他文件启动
export { app, router, store }
