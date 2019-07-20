/**
 * @file Filters / ES module
 * @module filters/index
 * @author Surmon <https://github.com/surmon-china>
 */

import { textOverflow, firstUpperCase } from '~/transforms/html.js'
import { timeAgo, toYMD, toLocalString } from '~/transforms/time.js'

export default {
  textOverflow,
  firstUpperCase,
  timeAgo,
  toYMD,
  toLocalString
}
