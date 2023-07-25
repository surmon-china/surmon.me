/**
 * @file Api config
 * @module config.api
 * @author Surmon <https://github.com/surmon-china>
 */

import { isServer, isDev } from '/@/app/environment'

// common
const API_PROXY_URL = import.meta.env.VITE_API_PROXY_URL as string
const API_LOCAL_URL = import.meta.env.VITE_API_LOCAL_URL as string
const API_ONLINE_URL = import.meta.env.VITE_API_ONLINE_URL as string

// dev: server ? online api : proxy</api>
// If you want to develop quickly, you can use a proxy address to connect directly to the production server.
const DEV_API = isServer ? API_ONLINE_URL : API_PROXY_URL
// const DEV_API = API_LOCAL_URL

// prod: server ? localhost : online api
// Using the localhost server to optimize network performance, but requires NodePress to be running on the same machine as this application.
const PROD_API = isServer ? API_LOCAL_URL : API_ONLINE_URL

export default {
  FE: import.meta.env.VITE_FE_URL as string,
  CDN: import.meta.env.VITE_CDN_URL as string,
  PROXY: import.meta.env.VITE_PROXY_URL as string,
  STATIC_CN: import.meta.env.VITE_STATIC_CN_URL as string,
  STATIC_GLO: import.meta.env.VITE_STATIC_GLO_URL as string,
  NODEPRESS: isDev ? DEV_API : PROD_API
}
