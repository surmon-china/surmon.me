/**
 * @file thumbnail transformer / ES module
 * @module transforms/thumbnail
 * @author Surmon <https://github.com/surmon-china>
 */

import gravatar from 'gravatar'
import API from '~/config/api.config'
import { getFileCDNUrl } from '~/transformers/url'

export const getBannerArticleThumbnailUrl = (thumb: string, isMobile: boolean, isWebPImage: boolean) => {
  if (!thumb) {
    return getFileCDNUrl(`/images/${isMobile ? 'mobile-' : ''}thumb-carrousel.jpg`)
  }
  if (isMobile) {
    return `${thumb}?x-oss-process=style/blog.list.banner.mobile`
  }

  return `${thumb}?x-oss-process=${
    isWebPImage
      ? 'style/blog.list.banner.pc'
      : 'image/auto-orient,1/resize,m_fill,w_1190,h_420/quality,q_90/format,jpg/watermark,text_U3VybW9uLm1l,type_ZHJvaWRzYW5zZmFsbGJhY2s,color_ffffff,size_32,g_sw,t_26,x_30,y_25'
  }`
}

export const getArchiveArticleThumbnailUrl = (thumb: string, isWebPImage: boolean) => {
  if (!thumb) {
    return getFileCDNUrl('/images/thumb-article.jpg')
  }

  return `${thumb}?x-oss-process=${
    isWebPImage
      ? 'style/blog.list.item.pc'
      : 'image/auto-orient,1/resize,m_fill,w_350,h_238/quality,q_80/format,jpg/watermark,text_U3VybW9uLm1l,type_ZHJvaWRzYW5zZmFsbGJhY2s,color_ffffff,size_20,g_sw,t_24,x_16,y_14'
  }`
}

export const getGravatarByEmail = (email: string) => {
  let avatar = gravatar.url(email, { protocol: 'https' })
  avatar = avatar.replace('https://s.gravatar.com/avatar', API.GRAVATAR)
  avatar += `?x-oss-process=style/gravatar`
  return avatar
}
