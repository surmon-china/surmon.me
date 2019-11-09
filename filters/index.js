/**
 * @file Filters / ES module
 * @module filters/index
 * @author Surmon <https://github.com/surmon-china>
 */

import { textOverflow, firstUpperCase } from '~/transforms/text'
import { timeAgo, toYMD, toLocalString } from '~/transforms/time'
import { getFileCDNUrl, getFileProxyUrl } from '~/transforms/url'

export default {
  textOverflow,
  firstUpperCase,
  timeAgo,
  toYMD,
  toLocalString,
  byCDN: getFileCDNUrl,
  byProxy: getFileProxyUrl
}
