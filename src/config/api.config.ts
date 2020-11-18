/**
 * @file Api config
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { isDev, isSPA, isSSR, isServer } from '/@/environment'

// common
const API_PROXY_URL = import.meta.env.VITE_API_PROXY_URL
const API_LOCAL_URL = import.meta.env.VITE_API_LOCAL_URL
const API_ONLINE_URL = import.meta.env.VITE_API_ONLINE_URL

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
  FE: import.meta.env.VITE_FE_URL,
  SOCKET: import.meta.env.VITE_SOCKET_URL,
  CDN: import.meta.env.VITE_CDN_URL,
  PROXY: import.meta.env.VITE_PROXY_URL,
  GRAVATAR: import.meta.env.VITE_GRAVATAR_URL,
  BASE: isDev ? DEV_API_BASE : PROD_API_BASE
}
