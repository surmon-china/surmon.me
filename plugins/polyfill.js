/**
 * @file polyfill / ES module
 * @module plugins/polyfill
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment'
import 'intersection-observer'

if (isBrowser) {
  // windows.xxx = xxx
}
