import Vue from 'vue'
import Router from 'vue-router'

// 应用路由
Vue.use(Router)

//　对应试图
import AppView from './components'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { 
      name: 'index',
      path: '/', 
      component: AppView.Index
    },
    {
      name: 'article',
      path: '/article/:article_id(\\d+)?', 
      component: AppView.Index
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ]
})
