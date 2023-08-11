/**
 * @file ImgProxy url transformer
 * @module transform.imgproxy
 * @author Surmon <https://github.com/surmon-china>
 */

import { normalizePath } from '/@/transforms/url'

// AVIF/WebP: https://docs.imgproxy.net/configuration?id=avifwebp-support-detection
// format: https://docs.imgproxy.net/image_formats_support
// resize: https://docs.imgproxy.net/generating_the_url?id=resize
// watermark: https://docs.imgproxy.net/generating_the_url?id=watermark

export interface ImgProxyOptions {
  width: number
  height: number
  watermark?: string
  format?: 'webp' | 'avif'
}

export const getImgProxyPath = (path: string, options: ImgProxyOptions) => {
  const resize = `resize:fill:${options.width}:${options.height}:0`
  const watermark = options.watermark ? `/${options.watermark}` : ''
  const format = options.format ? `@${options.format}` : ''
  return `/${resize}${watermark}/plain${normalizePath(path)}${format}`
}
