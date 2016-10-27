import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import { API_ROOT } from '../config'

// HTTP配置
Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true

// 请求拦截
Vue.http.interceptors.push((request, next) => {

  // request
  request.headers = request.headers || {}
  if (store.get('token')) request.headers.Authorization = 'Bearer ' + store.get('token')

  // response
  next((response) => {
    if (![200, 301].includes(response.status)) {
      // window.location.pathname = '/login'
    }
  })
})

// export const UserResource = Vue.resource(API_ROOT + 'users{/id}')
// export const AuthResource = Vue.resource(API_ROOT + 'auth{/id}')
export const TagResource = Vue.resource(API_ROOT + 'tag{/id}')
export const PageResource = Vue.resource(API_ROOT + 'page{/id}')
export const ArticleResource = Vue.resource(API_ROOT + 'article{/id}{/controller}')
export const CategoryResource = Vue.resource(API_ROOT + 'category{/id}{/controller}')
