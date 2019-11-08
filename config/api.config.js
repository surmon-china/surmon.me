/**
 * @file Api config / ES module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { NODE_ENV } from '../environment'

const gravatarUrl = 'https://static.surmon.me/avatar'

const apiMap = {
  development: {
    gravatarUrl,
    cdnUrl: '',
    proxyUrl: '/proxy/',
    baseUrl: 'http://localhost:8000',
    socketHost: 'http://localhost:3000'
  },
  production: {
    gravatarUrl,
    cdnUrl: 'https://cdn.surmon.me',
    proxyUrl: 'https://surmon.me/proxy/',
    baseUrl: 'https://api.surmon.me',
    socketHost: 'https://surmon.me'
  }
}

export default apiMap[NODE_ENV]
