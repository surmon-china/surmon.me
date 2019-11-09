/**
 * @file Url transformer / ES module
 * @module transforms/url
 * @author Surmon <https://github.com/surmon-china>
 */

import apiConfig from '~/config/api.config'

export const getFileCDNUrl = uri => {
  return `${apiConfig.CDN}${uri}`
}

export const getFileProxyUrl = uri => {
  return `${apiConfig.PROXY}${uri}`
}

