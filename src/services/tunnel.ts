/**
 * @file SSR BFF API Tunnel
 * @module service.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosInstance } from 'axios'
import { API_TUNNEL_PREFIX, getPort } from '/@/config/bff.config'
import { TunnelModule } from '/@/constants/tunnel'
import { isServer } from '/@/app/environment'

const tunnel = axios.create({
  baseURL: API_TUNNEL_PREFIX,
  proxy: isServer && {
    host: 'localhost',
    port: getPort()
  }
})

tunnel.interceptors.response.use((response) => response.data)

const service = {
  $: tunnel,
  request: <T = any>(...args: Parameters<AxiosInstance['request']>): Promise<T> =>
    tunnel.request(...args),
  dispatch: <T = any>(module: TunnelModule): Promise<T> => tunnel.get(module)
}

export default service
