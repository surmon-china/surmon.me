/**
 * @file BFF Tunnel API
 * @module service/tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import type { AppError } from '/@/app/error'
import { BFF_CONFIG } from '/@/configs/app.config'
import { TunnelModule } from '/@/constants/tunnel'
import { isClient } from '/@/configs/app.env'

const tunnel = axios.create({
  baseURL: isClient ? BFF_CONFIG.tunnel_url_prefix : `${BFF_CONFIG.server_local_url}${BFF_CONFIG.tunnel_url_prefix}`
})

// Transform response data
tunnel.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<string>) => {
    return Promise.reject({
      code: error?.status,
      message: error.response?.data ?? error.response?.statusText ?? error?.message
    } as AppError)
  }
)

export default {
  $: tunnel,
  request: <T = any>(...args: Parameters<AxiosInstance['request']>): Promise<T> => tunnel.request(...args),
  fetch: <T = any>(module: TunnelModule, params?: any): Promise<T> => tunnel.get(module, { params })
}
