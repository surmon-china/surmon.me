/**
 * @file HTTP requester service
 * @module service/http
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosInstance } from 'axios'
import { BAD_REQUEST } from '/@/constants/error'
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
  response => response.data.status === HTTPStatus.Success
    ? response.data
    : Promise.reject(response.data)
  ,
  error => {
    const errorJSON = error.toJSON()
    const messageText = error.response?.data?.message || 'Error'
    const errorText = error.response?.data?.error || error.response?.statusText || errorJSON.message
    const errorInfo = {
      ...errorJSON,
      config: error.config,
      request: error.request,
      response: error.response,
      code: error.code || error.response?.status || BAD_REQUEST,
      message: messageText + ': ' + errorText
    }
    console.debug('axios error:', errorInfo)
    return Promise.reject(errorInfo)
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
