/**
 * @file 留言表情雨 / ES module
 * @module plugins/emoji-233333
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'
import Emoji233333 from 'emoji-233333'

if (isBrowser) {
  window.Emoji233333 = Emoji233333
}
