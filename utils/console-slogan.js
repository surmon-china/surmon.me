/**
 * @file console.solgan / ES module
 * @module utils/console-slogan
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser, isProdMode } from '~/environment/esm'

export default () => {
  if (isBrowser && isProdMode) {
    console.clear()
    console.log('%cTalk is cheap. Show me the code %csurmon@foxmail.com', 'color:#666;font-size:3em;', 'color:#666;font-size:13px;')
  }
}
