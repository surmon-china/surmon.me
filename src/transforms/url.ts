/**
 * @file URL transformer
 * @module transform.url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { ProxyModule } from '/@/constants/proxy'
import { getArticleDetailRoute } from '/@/transforms/route'

export const getCDN_URL = (path: string) => {
  return `${API_CONFIG.CDN}${path}`
}

export const getStaticURL = (path: string, isCN?: boolean) => {
  return `${isCN ? API_CONFIG.STATIC_CN : API_CONFIG.STATIC_GLO}${path}`
}

export const reviseStaticURL = (url: string, isCN?: boolean) => {
  if (url.startsWith(API_CONFIG.STATIC_GLO)) {
    return getStaticURL(url.replace(API_CONFIG.STATIC_GLO, ''), isCN)
  } else {
    return url
  }
}

export const getProxyURL = (path: string, module: ProxyModule = ProxyModule.Default) => {
  return `${API_CONFIG.PROXY}/${module}/${encodeURIComponent(path)}`
}

export const getPageURL = (path: string) => {
  return `${API_CONFIG.FE}${path}`
}

export const getArticleDetailURL = (idOrSlug: string | number) => {
  return getPageURL(getArticleDetailRoute(idOrSlug))
}
