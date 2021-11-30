/**
 * @file Api config
 * @module config/api
 * @author Surmon <https://github.com/surmon-china>
 */

import { isDev } from '/@/environment'
import { isSPA, isServer } from '/@/app/environment'

// common
const API_PROXY_URL = import.meta.env.VITE_API_PROXY_URL as string
const API_LOCAL_URL = import.meta.env.VITE_API_LOCAL_URL as string
const API_ONLINE_URL = import.meta.env.VITE_API_ONLINE_URL as string

// dev:
//  SPA -> /api > dev server proxy > online API
//  SSR -> server ? online api : /api
const DEV_API = isSPA ? API_PROXY_URL : isServer ? API_ONLINE_URL : API_PROXY_URL

// prod:
//  SPA -> online api
//  SSR -> server ? localhost : online api
// MARK: 会引发 nginx 带来诸多意外问题
// const PROD_API = isSPA
//   ? API_ONLINE_URL
//   : isServer ? API_LOCAL_URL : API_ONLINE_URL
const PROD_API = API_ONLINE_URL

export default {
  FE: import.meta.env.VITE_FE_URL as string,
  SOCKET: import.meta.env.VITE_SOCKET_URL as string,
  CDN: import.meta.env.VITE_CDN_URL as string,
  PROXY: import.meta.env.VITE_PROXY_URL as string,
  GRAVATAR: import.meta.env.VITE_GRAVATAR_URL as string,
  NODEPRESS: isDev ? DEV_API : PROD_API
}
