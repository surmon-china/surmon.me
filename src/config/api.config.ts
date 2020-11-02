/**
 * @file Api config
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { isDev, isSSR, isServer } from '/@/environment'

const isSSRServer = isSSR && isServer

const PROXY_API_SERVER = '/api'
const LOCAL_API_SERVER = 'http://localhost:8000'
const PROD_API_SERVER = 'https://api.surmon.me'

const DEV_API = {
  BASE: LOCAL_API_SERVER,
  FE: 'http://localhost:3000',
  SOCKET: '/',
  CDN: '',
  PROXY: '/proxy',
  GRAVATAR: '/avatar'
}

const LOCAL_PROXY_DEV_API = {
  ...DEV_API,
  BASE: isSSRServer
    ? PROD_API_SERVER
    : PROXY_API_SERVER
}

const PROD_API = {
  BASE: isSSRServer
    ? LOCAL_API_SERVER
    : PROXY_API_SERVER,
  FE: 'https://surmon.me',
  SOCKET: 'https://surmon.me',
  CDN: 'https://cdn.surmon.me',
  PROXY: 'https://cdn.surmon.me/proxy',
  GRAVATAR: 'https://static.surmon.me/avatar'
}

// export default DEV_API
export default LOCAL_PROXY_DEV_API
// export default isDev ? DEV_API : PROD_API
