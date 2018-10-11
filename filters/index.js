/**
 * @file Filters / ES module
 * @module filters/index
 * @author Surmon <https://github.com/surmon-china>
 */

import { textOverflow, firstUpperCase } from './html-filter.js'
import { timeAgo, toYMD, toLocalString } from './time-filter.js'

export default {
  textOverflow,
  firstUpperCase,
  timeAgo,
  toYMD,
  toLocalString
}
