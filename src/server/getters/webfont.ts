/**
 * @file WebFont getter
 * @module server.getter.webfont
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import fs from 'fs-extra'
import Fontmin from 'fontmin'
import { PUBLIC_PATH } from '../helpers/configurer'

export const WebFontContentType = 'font/woff2'

export interface IWebFontOptions {
  fontname: string
  text: string
}

export const getWebFont = (options: IWebFontOptions) => {
  const fontPath = path.resolve(PUBLIC_PATH, 'fonts', options.fontname)
  if (!fs.existsSync(fontPath)) {
    return Promise.reject(`Font "${options.fontname}" not found!`)
  }

  // https://github.com/ecomfe/fontmin
  const text = Array.from(new Set(options.text.split(''))).join('')
  const fontmin = new Fontmin()
    .src(fontPath)
    .use(Fontmin.glyph({ text, hinting: false }))
    .use(Fontmin.ttf2woff2())
  return new Promise((resolve, reject) => {
    fontmin.run((error, files) => {
      error ? reject(error) : resolve(files[0]._contents)
    })
  })
}
