/**
 * @file ImgProxy url transformer
 * @module transform.imgproxy
 * @author Surmon <https://github.com/surmon-china>
 */

import { normalizePath } from '/@/transforms/url'

export type ImgProxyFormat = 'webp' | 'avif'

export interface ImgProxyOptions {
  // resize: https://docs.imgproxy.net/generating_the_url?id=resize
  resize?: boolean
  width?: number
  height?: number
  // watermark: https://docs.imgproxy.net/generating_the_url?id=watermark
  watermark?: string
  // format: https://docs.imgproxy.net/image_formats_support
  format?: ImgProxyFormat
  // quality: https://docs.imgproxy.net/generating_the_url?id=quality
  quality?: number
}

export const getImgProxyPath = (path: string, options: ImgProxyOptions) => {
  const resize = options.resize ? `resize:fill:${options.width || ''}:${options.height || ''}:0` : ''
  const watermark = options.watermark ? `/${options.watermark}` : ''
  const format = options.format ? `@${options.format}` : ''
  return `/${resize}${watermark}/plain${normalizePath(path)}${format}`.replaceAll('//', '/')
}
