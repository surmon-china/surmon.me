/**
 * @file Api config / ES module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { NODE_ENV } from '../environment'

const apiMap = {
  development: {
    cdnUrl: '',
    proxyUrl: '/proxy/',
    baseUrl: 'http://localhost:8000',
    socketHost: 'http://localhost:3000'
  },
  production: {
    cdnUrl: 'https://cdn.surmon.me',
    proxyUrl: 'https://surmon.me/proxy/',
    baseUrl: 'https://api.surmon.me',
    socketHost: 'https://surmon.me'
  }
}

export default apiMap[NODE_ENV]
