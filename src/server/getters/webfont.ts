/**
 * @file WebFont getter
 * @module server.getter.webfont
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import fs from 'fs-extra'
import Fontmin from 'fontmin'
import { PUBLIC_PATH } from '../config'

export const WebFontContentType = 'font/woff2'

export interface IWebFontOptions {
  fontname: string
  text: string
}

const cacheMap = new Map<string, any>()

export const getWebFont = (options: IWebFontOptions): Promise<any> => {
  const text = Array.from(new Set(options.text.split(''))).join('')
  const fontPath = path.resolve(PUBLIC_PATH, 'fonts', options.fontname)
  if (!fs.existsSync(fontPath)) {
    return Promise.reject(`Font "${options.fontname}" not found!`)
  }

  // memory cache
  const cacheKey = `${options.fontname}_${text}`
  if (cacheMap.has(cacheKey)) {
    return Promise.resolve(cacheMap.get(cacheKey))
  }

  // https://github.com/ecomfe/fontmin
  const fontmin = new Fontmin()
    .src(fontPath)
    .use(Fontmin.glyph({ text, hinting: false }))
    .use(Fontmin.ttf2woff2())
  return new Promise((resolve, reject) => {
    fontmin.run((error, files) => {
      if (error) {
        reject(error)
      } else {
        // @ts-ignore
        const fontData = files[0]._contents
        cacheMap.set(cacheKey, fontData)
        resolve(fontData)
      }
    })
  })
}
