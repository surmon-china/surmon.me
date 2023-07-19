/**
 * @file Thumbnail transformer
 * @module transform.thumbnail
 * @author Surmon <https://github.com/surmon-china>
 */

import { getCDN_URL } from '/@/transforms/url'

// https://help.aliyun.com/document_detail/209551.html
// https://help.aliyun.com/document_detail/193593.html
// MARK: Auto WebP with AlibabaCloud CDN
const WebPArgs = `format,webp/`

export const getArticleBannerThumbnailURL = (url: string, isWebPImage: boolean) => {
  if (!url) {
    return getCDN_URL(`/images/thumbnail/carrousel.jpg`)
  }

  const w = 1190
  const h = 420
  const format = isWebPImage ? WebPArgs : ''
  const watermark = `watermark,text_U3VybW9uLm1l,type_bm90b3NhbnM,color_ffffff,size_31,g_sw,t_26,x_30,y_18`
  return `${url}?image_process=${format}quality,q_88/resize,w_${w},h_${h}/crop,mid,w_${w},h_${h}/${watermark}`
}

export const getMobileArticleListThumbnailURL = (url: string, isWebPImage = false) => {
  if (!url) {
    return ''
  }

  const w = 700
  const h = 247
  const format = isWebPImage ? WebPArgs : ''
  const watermark = `watermark,text_U3VybW9uLm1l,type_bm90b3NhbnM,color_ffffff,size_28,g_sw,t_26,x_22,y_18`
  return `${url}?image_process=${format}quality,q_82/resize,w_${w},h_${h}/crop,mid,w_${w},h_${h}/${watermark}`
}

export const getArticleListThumbnailURL = (url: string, isWebPImage: boolean) => {
  if (!url) {
    return ''
  }
  const w = 350
  const h = 238
  const format = isWebPImage ? WebPArgs : ''
  return `${url}?image_process=${format}quality,q_80/resize,w_${w},h_${h}/crop,mid,w_${w},h_${h}`
}

export const getArticleSquareThumbnailURL = (url: string) => {
  const size = 320
  return url ? `${url}?image_process=quality,q_84/resize,w_${size},h_${size}/crop,mid,w_${size},h_${size}` : ''
}
