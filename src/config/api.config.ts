/**
 * @file Api config
 * @module config/api
 * @author Surmon <https://github.com/surmon-china>
 */

import { isDev, isSPA, isServer } from '/@/environment'

// common
const API_PROXY_URL = import.meta.env.VITE_API_PROXY_URL as string
const API_LOCAL_URL = import.meta.env.VITE_API_LOCAL_URL as string
const API_ONLINE_URL = import.meta.env.VITE_API_ONLINE_URL as string

// dev:
//  spa -> /api
//  ssr -> server ? online api : /api
const DEV_API_BASE = isSPA
  ? API_PROXY_URL
  : isServer ? API_ONLINE_URL : API_PROXY_URL

// prod:
//  spa -> online api
//  ssr -> server ? localhost : online api
const PROD_API_BASE = isSPA
  ? API_ONLINE_URL
  : isServer ? API_LOCAL_URL : API_ONLINE_URL

export default {
  FE: import.meta.env.VITE_FE_URL as string,
  SOCKET: import.meta.env.VITE_SOCKET_URL as string,
  CDN: import.meta.env.VITE_CDN_URL as string,
  PROXY: import.meta.env.VITE_PROXY_URL as string,
  GRAVATAR: import.meta.env.VITE_GRAVATAR_URL as string,
  BASE: isDev ? DEV_API_BASE : PROD_API_BASE
}
