/**
 * @file URL transformer
 * @module transform.url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { BFF_PROXY_PREFIX } from '/@/config/bff.config'
import { ProxyModule } from '/@/constants/proxy'
import { isDev } from '/@/app/environment'
import { isCNUser } from './region'
import { getArticleDetailRoute } from '/@/transforms/route'

export enum CDNPrefix {
  Assets = 'assets',
  Static = 'static',
  ImgProxy = 'imgproxy'
}

export const getCDNDomain = (isCN?: boolean) => {
  const _isCN = isCN ?? isCNUser()
  return _isCN ? API_CONFIG.CDN_CN : API_CONFIG.CDN_GLOBAL
}

export const getCDNPrefixURL = (prefix: CDNPrefix, isCN?: boolean) => {
  return `${getCDNDomain(isCN)}/${prefix}`
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

export const getAssetURL = (path: string, isCN?: boolean) => {
  return isDev ? normalizePath(path) : `${getCDNPrefixURL(CDNPrefix.Assets, isCN)}${normalizePath(path)}`
}

export const getStaticURL = (path: string, isCN?: boolean) => {
  return `${getCDNPrefixURL(CDNPrefix.Static, isCN)}${normalizePath(path)}`
}

export const getImgProxyURL = (path: string, isCN?: boolean) => {
  return `${getCDNPrefixURL(CDNPrefix.ImgProxy, isCN)}${normalizePath(path)}`
}

export const getProxyURL = (path: string, module: ProxyModule = ProxyModule.Default) => {
  return `${BFF_PROXY_PREFIX}/${module}/${encodeURIComponent(path)}`
}

export const getPageURL = (path: string) => {
  return `${API_CONFIG.FE}${path}`
}

export const getArticleDetailURL = (idOrSlug: string | number) => {
  return getPageURL(getArticleDetailRoute(idOrSlug))
}
