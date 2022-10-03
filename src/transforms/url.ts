/**
 * @file Url transformer
 * @module transform.url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { ProxyModule } from '/@/constants/proxy'
import { getArticleDetailRoute } from '/@/transforms/route'

export const getTargetCDNURL = (path: string) => {
  return `${API_CONFIG.CDN}${path}`
}

export const getTargetProxyURL = (path: string, module: ProxyModule = ProxyModule.Default) => {
  return `${API_CONFIG.PROXY}/${module}/${encodeURIComponent(path)}`
}

export const getTargetStaticURL = (path: string) => {
  return `${API_CONFIG.STATIC}${path}`
}

export const getPageURL = (path: string) => {
  return `${API_CONFIG.FE}${path}`
}

export const getArticleDetailURL = (idOrSlug: string | number) => {
  return getPageURL(getArticleDetailRoute(idOrSlug))
}
