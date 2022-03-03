/**
 * @file Url transformer
 * @module transform.url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { ProxyModule } from '/@/constants/proxy'
import { getArticleDetailRoute } from '/@/transforms/route'

export const getTargetCDNURL = (uri: string) => {
  return `${API_CONFIG.CDN}${uri}`
}

export const getTargetProxyURL = (uri: string, module: ProxyModule = ProxyModule.Default) => {
  return `${API_CONFIG.PROXY}/${module}/${encodeURIComponent(uri)}`
}

export const getTargetStaticURL = (uri: string) => {
  return `${API_CONFIG.STATIC}${uri}`
}

export const getPageURL = (uri: string) => {
  return `${API_CONFIG.FE}${uri}`
}

export const getArticleDetailURL = (IDOrSlug: string | number) => {
  return getPageURL(getArticleDetailRoute(IDOrSlug))
}
