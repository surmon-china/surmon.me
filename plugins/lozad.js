/**
 * @file 懒加载 / ES module
 * @module plugins/lozad
 * @author Surmon <https://github.com/surmon-china>
 */

import lozad from 'lozad'
import { isBrowser } from '~/environment/esm'

if (isBrowser) {
  window.lozad = lozad
}

export default lozad
