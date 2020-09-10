/**
 * @file HTTP service
 * @module service/http
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosInstance } from 'axios'
import API_CONFIG from '/@/config/api.config'

export enum HTTPStatus {
  Error = 'error',
  Success = 'success',
}

type HTTPResult<T = any> = {
  status: HTTPStatus.Success
  message: string
  result: T
}

const http = axios.create({
  baseURL: API_CONFIG.BASE,
})

http.interceptors.response.use(
  response => {
    if (response.data.status === HTTPStatus.Success) {
      return response.data
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    console.debug('Toast:', error)
    return Promise.reject(error)
  }
)

const service = {
  $: http,
  request: <T = any>(...args: Parameters<AxiosInstance['request']>): Promise<HTTPResult<T>> => http.request(...args),
  get: <T = any>(...args: Parameters<AxiosInstance['get']>): Promise<HTTPResult<T>> => http.get(...args),
  delete: <T = any>(...args: Parameters<AxiosInstance['delete']>): Promise<HTTPResult<T>> => http.delete(...args),
  head: <T = any>(...args: Parameters<AxiosInstance['head']>): Promise<HTTPResult<T>> => http.head(...args),
  options: <T = any>(...args: Parameters<AxiosInstance['options']>): Promise<HTTPResult<T>> => http.options(...args),
  post: <T = any>(...args: Parameters<AxiosInstance['post']>): Promise<HTTPResult<T>> => http.post(...args),
  put: <T = any>(...args: Parameters<AxiosInstance['put']>): Promise<HTTPResult<T>> => http.put(...args),
  patch: <T = any>(...args: Parameters<AxiosInstance['patch']>): Promise<HTTPResult<T>> => http.patch(...args),
}

export default service
