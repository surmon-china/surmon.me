/**
 * @file Thumbnail transformer
 * @module transformer.thumbnail
 * @author Surmon <https://github.com/surmon-china>
 */

import gravatar from 'gravatar'
import API_CONFIG from '/@/config/api.config'
import { getFileCDNUrl } from '/@/transforms/url'

export const getArticleBannerThumbnailURL = (thumb: string, isWebPImage: boolean) => {
  if (!thumb) {
    return getFileCDNUrl(`/images/thumbnail/pc-carrousel.jpg`)
  }

  return `${thumb}?x-oss-process=${
    isWebPImage
      ? 'style/blog.list.banner.pc'
      : 'image/auto-orient,1/resize,m_fill,w_1190,h_420/quality,q_90/format,jpg/watermark,text_U3VybW9uLm1l,type_ZHJvaWRzYW5zZmFsbGJhY2s,color_ffffff,size_32,g_sw,t_26,x_30,y_25'
  }`
}

export const getMobileArticleListThumbnailURL = (thumb: string, isWebPImage: boolean) => {
  if (!thumb) {
    return getFileCDNUrl(`/images/thumbnail/pc-carrousel.jpg`)
  }

  return `${thumb}?x-oss-process=${
    isWebPImage
      ? 'style/blog.list.item.mobile'
      : 'image/auto-orient,1/resize,m_fill,w_700,h_247/quality,q_86/format,jpg/watermark,text_U3VybW9uLm1l,type_ZHJvaWRzYW5zZmFsbGJhY2s,color_ffffff,size_30,g_sw,t_26,x_30,y_25'
  }`
}

export const getArticleListThumbnailURL = (thumb: string, isWebPImage: boolean) => {
  if (!thumb) {
    return getFileCDNUrl('/images/thumbnail/pc-article-list.jpg')
  }

  return `${thumb}?x-oss-process=${
    isWebPImage
      ? 'style/blog.list.item.pc'
      : 'image/auto-orient,1/resize,m_fill,w_350,h_238/quality,q_80/format,jpg/watermark,text_U3VybW9uLm1l,type_ZHJvaWRzYW5zZmFsbGJhY2s,color_ffffff,size_20,g_sw,t_24,x_16,y_14'
  }`
}

export const getGravatarByEmail = (email: string) => {
  const avatar = gravatar
    .url(email, { protocol: 'https', s: '240' })
    .replace('https://s.gravatar.com/avatar', API_CONFIG.GRAVATAR)
  // avatar += `?x-oss-process=style/gravatar`
  return avatar
}
