/**
 * @file Api config
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { isDev } from '/@/vuniversal/env'

const DEV_API = {
  FE: 'http://localhost:3000',
  BASE: 'http://localhost:8000',
  CDN: '',
  PROXY: '/proxy',
  SOCKET: 'http://localhost:3000',
  GRAVATAR: '/proxy/static.surmon.me/avatar'
}

const PROD_API = {
  FE: 'https://surmon.me',
  BASE: 'https://api.surmon.me',
  CDN: 'https://cdn.surmon.me',
  PROXY: 'https://cdn.surmon.me/proxy',
  SOCKET: 'https://surmon.me',
  GRAVATAR: 'https://static.surmon.me/avatar'
}

export default isDev ? DEV_API : PROD_API
