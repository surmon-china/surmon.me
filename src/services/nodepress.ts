/**
 * @file NodePress API service
 * @module service/nodepress
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import type { AxiosError, AxiosInstance, Method as AxiosMethod } from 'axios'
import type { AppError } from '/@/app/error'
import { BAD_REQUEST, NETWORK_ERROR } from '/@/constants/http-code'
import { isClient } from '/@/configs/app.env'
import API_CONFIG from '/@/configs/app.api'
import logger from '/@/utils/logger'

export enum NodePressResponseStatus {
  Error = 'error',
  Success = 'success'
}

export type NodePressSuccessResponse<T = any> = {
  status: NodePressResponseStatus.Success
  message: string
  result: T
}

export interface NodePressErrorResponse {
  status: NodePressResponseStatus.Error
  message: string
  error: string
  timestamp: string
}

const nodepress = axios.create({
  baseURL: API_CONFIG.NODEPRESS,
  withCredentials: true
})

nodepress.interceptors.response.use(
  (response) => {
    if (response.headers?.['content-type']?.includes('json')) {
      if (response.data.status !== NodePressResponseStatus.Success) {
        return Promise.reject(response.data)
      }
    }

    return response.data
  },
  (error: AxiosError<NodePressErrorResponse>) => {
    if (isClient) {
      logger.debug('axios error:', error)
    }

    const fallbackCode = error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' ? NETWORK_ERROR : BAD_REQUEST
    return Promise.reject({
      code: error?.status ?? error.response?.status ?? fallbackCode,
      message: error.response?.data?.message || error.response?.statusText || error?.message
    } as AppError)
  }
)

type Method = Exclude<Lowercase<AxiosMethod>, 'unlink' | 'purge' | 'link'> | 'request'
const overwrite = (method: Method) => {
  return <T = any>(...args: Parameters<AxiosInstance[typeof method]>): Promise<NodePressSuccessResponse<T>> => {
    return (nodepress[method] as any)(...args)
  }
}

export default {
  $: nodepress,
  request: overwrite('request'),
  head: overwrite('head'),
  get: overwrite('get'),
  post: overwrite('post'),
  put: overwrite('put'),
  patch: overwrite('patch'),
  delete: overwrite('delete'),
  options: overwrite('options')
}
