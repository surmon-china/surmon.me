/**
 * @file Url transformer
 * @module transformer/url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { TunnelModule } from '/@/constants/tunnel'
import { getArticleDetailRoute } from '/@/transforms/route'

export const getTunnelApiPath = (moduleName: TunnelModule) => {
  return `/${moduleName}`
}

export const getFileCDNUrl = (uri: string) => {
  return `${API_CONFIG.CDN}${uri}`
}

export const getFileProxyUrl = (uri: string) => {
  return `${API_CONFIG.PROXY}${uri}`
}

export const getPageUrl = (uri: string) => {
  return `${API_CONFIG.FE}${uri}`
}

export const getArticleDetailUrl = (articleID: string | number) => {
  return getPageUrl(getArticleDetailRoute(articleID))
}

export const getGAScriptUrl = (gaMeasurementId: string) => {
  return `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
}
