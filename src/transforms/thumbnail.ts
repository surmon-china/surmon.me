/**
 * @file Thumbnail transformer
 * @module transform.thumbnail
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from '/@/config/api.config'
import { getCDN_URL, getStaticURL } from '/@/transforms/url'

// format: https://docs.imgproxy.net/image_formats_support
// resize: https://docs.imgproxy.net/generating_the_url?id=resize
// watermark: https://docs.imgproxy.net/generating_the_url?id=watermark
const WebPFormat = `@webp`
interface ImgProxyOptions {
  width: number
  height: number
  watermark?: string
  webp?: boolean
}
const getImgProxyURI = (path: string, options: ImgProxyOptions) => {
  const resize = `resize:fill:${options.width}:${options.height}:0`
  const format = options.webp ? WebPFormat : ''
  const watermark = options.watermark ? `/${options.watermark}` : ''
  const filePath = path.startsWith('/') ? path : `/${path}`
  return `/imgproxy/${resize}${watermark}/plain${filePath}${format}`
}

export interface ThumbnailOptions {
  url: string
  isWebP?: boolean
  isCN?: boolean
}

export const getArticleBannerThumbnailURL = (options: ThumbnailOptions) => {
  if (!options.url) {
    return getCDN_URL(`/images/thumbnail/carrousel.jpg`)
  }
  if (!options.url.startsWith(API_CONFIG.STATIC_GLO)) {
    return options.url
  }

  const url = getImgProxyURI(options.url.replace(API_CONFIG.STATIC_GLO, ''), {
    width: 1190,
    height: 420,
    webp: options.isWebP,
    watermark: `watermark:0.36:sowe:18:18:0.15`
  })

  return getStaticURL(url, options.isCN)
}

export const getMobileArticleListThumbnailURL = (options: ThumbnailOptions) => {
  if (!options.url) {
    return ''
  }
  if (!options.url.startsWith(API_CONFIG.STATIC_GLO)) {
    return options.url
  }

  const url = getImgProxyURI(options.url.replace(API_CONFIG.STATIC_GLO, ''), {
    width: 700,
    height: 247,
    webp: options.isWebP,
    watermark: `watermark:0.38:sowe:18:16:0.16`
  })

  return getStaticURL(url, options.isCN)
}

export const getReletedArticleListThumbnailURL = (options: ThumbnailOptions) => {
  if (!options.url) {
    return ''
  }
  if (!options.url.startsWith(API_CONFIG.STATIC_GLO)) {
    return options.url
  }

  const url = getImgProxyURI(options.url.replace(API_CONFIG.STATIC_GLO, ''), {
    width: 466,
    height: 168,
    webp: options.isWebP
  })

  return getStaticURL(url, options.isCN)
}

export const getArticleListThumbnailURL = (options: ThumbnailOptions) => {
  if (!options.url) {
    return ''
  }
  if (!options.url.startsWith(API_CONFIG.STATIC_GLO)) {
    return options.url
  }

  const url = getImgProxyURI(options.url.replace(API_CONFIG.STATIC_GLO, ''), {
    width: 350,
    height: 238,
    webp: options.isWebP
  })

  return getStaticURL(url, options.isCN)
}
