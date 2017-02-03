import Vue from 'vue'
import axios from 'axios'

// 拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$http = axios;

export default axios.create({
  baseURL: process.env.baseURL || 'http://localhost:8000'
});