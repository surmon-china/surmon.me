/**
 * @file ImgProxy url transformer
 * @module transform.imgproxy
 * @author Surmon <https://github.com/surmon-china>
 */

import { normalizePath } from '/@/transforms/url'

// format: https://docs.imgproxy.net/image_formats_support
// resize: https://docs.imgproxy.net/generating_the_url?id=resize
// watermark: https://docs.imgproxy.net/generating_the_url?id=watermark
const WebPFormat = `@webp`

export interface ImgProxyOptions {
  width: number
  height: number
  watermark?: string
  webp?: boolean
}

export const getImgProxyPath = (path: string, options: ImgProxyOptions) => {
  const resize = `resize:fill:${options.width}:${options.height}:0`
  const format = options.webp ? WebPFormat : ''
  const watermark = options.watermark ? `/${options.watermark}` : ''
  return `/${resize}${watermark}/plain${normalizePath(path)}${format}`
}
