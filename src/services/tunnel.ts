/**
 * @file SSR BFF API Tunnel
 * @module service.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosInstance, isAxiosError } from 'axios'
import { BFF_TUNNEL_PREFIX, getBFFServerPort } from '/@/config/bff.config'
import { TunnelModule } from '/@/constants/tunnel'
import { isClient } from '/@/app/environment'

const tunnel = axios.create({
  baseURL: isClient ? BFF_TUNNEL_PREFIX : `http://localhost:${getBFFServerPort()}${BFF_TUNNEL_PREFIX}`
})

tunnel.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(isAxiosError(error) ? error.toJSON() : error)
)

export default {
  $: tunnel,
  request: <T = any>(...args: Parameters<AxiosInstance['request']>): Promise<T> => tunnel.request(...args),
  dispatch: <T = any>(module: TunnelModule, params?: any): Promise<T> => tunnel.get(module, { params })
}
