/**
 * @file Api config / ES module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { NODE_ENV } from '../environment'

const apisMap = {
  development: {
    CDN: '',
    PROXY: '/proxy',
    BASE: 'http://localhost:8000',
    SOCKET: 'http://localhost:3000',
    GRAVATAR: '/proxy/static.surmon.me/avatar'
  },
  production: {
    CDN: 'https://cdn.surmon.me',
    PROXY: 'https://cdn.surmon.me/proxy',
    BASE: 'https://api.surmon.me',
    SOCKET: 'https://surmon.me',
    GRAVATAR: 'https://static.surmon.me/avatar'
  }
}

export default apisMap[NODE_ENV]
