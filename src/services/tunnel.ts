/**
 * @file SSR BFF API Tunnel
 * @module service/tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosInstance } from 'axios'
import API_CONFIG from '/@/config/api.config'
import { TunnelModule } from '/@/constants/tunnel'
import { getTunnelApiPath } from '/@/transforms/url'
import { isServer } from '/@/environment'

const tunnel = axios.create({
  baseURL: API_CONFIG.TUNNEL,
  proxy: isServer && {
    host: 'localhost',
    port: API_CONFIG.SERVER_PORT
  }
})

tunnel.interceptors.response.use(
  response => response.data
)

const service = {
  $: tunnel,
  request: <T = any>(...args: Parameters<AxiosInstance['request']>): Promise<T> => tunnel.request(...args),
  dispatch: <T = any>(module: TunnelModule): Promise<T> => tunnel.get(getTunnelApiPath(module)),
}

export default service
