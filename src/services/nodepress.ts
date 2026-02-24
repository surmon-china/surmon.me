/**
 * @file NodePress API service
 * @module service/nodepress
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
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

    const fallbackCode =
      error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' ? NETWORK_ERROR : BAD_REQUEST
    return Promise.reject({
      code: error?.status ?? error.response?.status ?? fallbackCode,
      message: error.response?.data?.message || error.response?.statusText || error?.message
    } as AppError)
  }
)

interface NodePressRequestConfig extends AxiosRequestConfig {
  token?: string | null
}

const request = <T = any>(config: NodePressRequestConfig): Promise<NodePressSuccessResponse<T>> => {
  const { token, headers, ...restConfig } = config
  const finalHeaders = {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
  return nodepress.request({ ...restConfig, headers: finalHeaders })
}

export default {
  $: nodepress,
  request,
  get<T = any>(url: string, config?: NodePressRequestConfig) {
    return this.request<T>({ ...config, method: 'get', url })
  },
  post<T = any>(url: string, data?: any, config?: NodePressRequestConfig) {
    return this.request<T>({ ...config, method: 'post', url, data })
  },
  put<T = any>(url: string, data?: any, config?: NodePressRequestConfig) {
    return this.request<T>({ ...config, method: 'put', url, data })
  },
  patch<T = any>(url: string, data?: any, config?: NodePressRequestConfig) {
    return this.request<T>({ ...config, method: 'patch', url, data })
  },
  delete<T = any>(url: string, config?: NodePressRequestConfig) {
    return this.request<T>({ ...config, method: 'delete', url })
  }
}
