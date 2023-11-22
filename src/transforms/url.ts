/**
 * @file URL transformer
 * @module transform.url
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { BFF_PROXY_PREFIX } from '/@/config/bff.config'
import { isDev } from '/@/app/environment'

export enum CDNPrefix {
  Proxy = 'proxy',
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

export const isOriginalStaticURL = (url?: string) => {
  return url?.startsWith(API_CONFIG.STATIC)
}

export const getStaticPath = (url: string) => {
  return url.replace(API_CONFIG.STATIC, '')
}

export const getOriginalProxyURL = (url: string) => {
  return `${BFF_PROXY_PREFIX}/${btoa(url)}`
}

export const getProxyURL = (domain: string, url: string) => {
  return isDev ? getOriginalProxyURL(url) : `${getCDNPrefixURL(domain, CDNPrefix.Proxy)}/${btoa(url)}`
}

export const getPageURL = (path: string, hash?: string) => {
  const targetPath = hash ? `${path}#${hash}` : path
  return `${API_CONFIG.FE}${normalizePath(targetPath)}`
}
