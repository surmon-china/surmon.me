/**
 * @file HTTP requester service
 * @module service/http
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosInstance } from 'axios'
import { isClient } from '/@/app/environment'
import { BAD_REQUEST } from '/@/constants/error'
import API_CONFIG from '/@/config/api.config'

export enum HTTPStatus {
  Error = 'error',
  Success = 'success'
}

type HTTPResult<T = any> = {
  status: HTTPStatus.Success
  message: string
  result: T
}

const nodepress = axios.create({
  baseURL: API_CONFIG.NODEPRESS
})

nodepress.interceptors.response.use(
  (response) =>
    response.data.status === HTTPStatus.Success ? response.data : Promise.reject(response.data),
  (error) => {
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
    isClient
      ? console.debug('axios error:', errorInfo)
      : console.debug('axios error:', errorInfo.message)
    return Promise.reject(errorInfo)
  }
)

const service = {
  $: nodepress,
  request: <T = any>(...args: Parameters<AxiosInstance['request']>): Promise<HTTPResult<T>> =>
    nodepress.request(...args),
  get: <T = any>(...args: Parameters<AxiosInstance['get']>): Promise<HTTPResult<T>> =>
    nodepress.get(...args),
  delete: <T = any>(...args: Parameters<AxiosInstance['delete']>): Promise<HTTPResult<T>> =>
    nodepress.delete(...args),
  head: <T = any>(...args: Parameters<AxiosInstance['head']>): Promise<HTTPResult<T>> =>
    nodepress.head(...args),
  options: <T = any>(...args: Parameters<AxiosInstance['options']>): Promise<HTTPResult<T>> =>
    nodepress.options(...args),
  post: <T = any>(...args: Parameters<AxiosInstance['post']>): Promise<HTTPResult<T>> =>
    nodepress.post(...args),
  put: <T = any>(...args: Parameters<AxiosInstance['put']>): Promise<HTTPResult<T>> =>
    nodepress.put(...args),
  patch: <T = any>(...args: Parameters<AxiosInstance['patch']>): Promise<HTTPResult<T>> =>
    nodepress.patch(...args)
}

export default service
