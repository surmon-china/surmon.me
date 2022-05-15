/**
 * @file Thumbnail transformer
 * @module transform.thumbnail
 * @author Surmon <https://github.com/surmon-china>
 */

import { getTargetCDNURL } from '/@/transforms/url'

// https://help.aliyun.com/document_detail/209551.html
// https://help.aliyun.com/document_detail/193593.html
// MARK: Auto WebP with AlibabaCloud CDN
const WebP = `format,webp/`

export const getArticleBannerThumbnailURL = (thumb: string, isWebPImage: boolean) => {
  if (!thumb) {
    return getTargetCDNURL(`/images/thumbnail/carrousel.jpg`)
  }

  const w = 1190
  const h = 420
  const format = isWebPImage ? WebP : ''
  const watermark = `watermark,text_U3VybW9uLm1l,type_bm90b3NhbnM,color_ffffff,size_31,g_sw,t_26,x_30,y_18`
  return `${thumb}?image_process=${format}quality,q_88/resize,w_${w},h_${h}/crop,mid,w_${w},h_${h}/${watermark}`
}

export const getMobileArticleListThumbnailURL = (thumb: string, isWebPImage = false) => {
  if (!thumb) {
    return ''
  }

  const w = 700
  const h = 247
  const format = isWebPImage ? WebP : ''
  const watermark = `watermark,text_U3VybW9uLm1l,type_bm90b3NhbnM,color_ffffff,size_28,g_sw,t_26,x_22,y_18`
  return `${thumb}?image_process=${format}quality,q_82/resize,w_${w},h_${h}/crop,mid,w_${w},h_${h}/${watermark}`
}

export const getArticleListThumbnailURL = (thumb: string, isWebPImage: boolean) => {
  if (!thumb) {
    return ''
  }
  const w = 350
  const h = 238
  const format = isWebPImage ? WebP : ''
  return `${thumb}?image_process=${format}quality,q_80/resize,w_${w},h_${h}/crop,mid,w_${w},h_${h}`
}

export const getArticleSquareThumbnailURL = (thumb: string) => {
  const size = 320
  return thumb
    ? `${thumb}?image_process=quality,q_84/resize,w_${size},h_${size}/crop,mid,w_${size},h_${size}`
    : ''
}
