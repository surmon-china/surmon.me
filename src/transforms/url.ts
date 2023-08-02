/**
 * @file URL transformer
 * @module transform.url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { BFF_PROXY_PREFIX } from '/@/config/bff.config'
import { ProxyModule } from '/@/constants/proxy'
import { getArticleDetailRoute } from '/@/transforms/route'
import { isDev } from '/@/app/environment'

export enum CDNPrefix {
  Assets = 'assets',
  Static = 'static',
  ImgProxy = 'imgproxy'
}

export const getCDNPrefixURL = (domain: string, prefix: CDNPrefix) => {
  return `${domain}/${prefix}`
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

export const getAssetURL = (domain: string, path: string) => {
  const normalizedPath = normalizePath(path)
  return isDev ? normalizedPath : `${getCDNPrefixURL(domain, CDNPrefix.Assets)}${normalizedPath}`
}

export const getStaticURL = (domain: string, path: string) => {
  return `${getCDNPrefixURL(domain, CDNPrefix.Static)}${normalizePath(path)}`
}

export const getImgProxyURL = (domain: string, path: string) => {
  return `${getCDNPrefixURL(domain, CDNPrefix.ImgProxy)}${normalizePath(path)}`
}

export const getProxyURL = (path: string, module: ProxyModule = ProxyModule.Default) => {
  return `${BFF_PROXY_PREFIX}/${module}/${encodeURIComponent(path)}`
}

export const getPageURL = (path: string) => {
  return `${API_CONFIG.FE}${normalizePath(path)}`
}

export const getArticleDetailURL = (idOrSlug: string | number) => {
  return getPageURL(getArticleDetailRoute(idOrSlug))
}
