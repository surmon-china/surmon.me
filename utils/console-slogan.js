/**
 * @file console.solgan / ES module
 * @module utils/console-slogan
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser, isProdMode } from '~/environment'

export default function consoleSlogan () {
  if (isBrowser && isProdMode) {
    console.clear()
    console.log(`%c${window.$nuxt.$i18n.text.slogan} %csurmon@foxmail.com`, 'color:#666;font-size:3em;', 'color:#666;font-size:13px;')
  }
}
