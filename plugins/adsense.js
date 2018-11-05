/**
 * @file Google adsense / ES module
 * @module plugins/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import { isBrowser } from '~/environment'
import AdsenseComponents from '~/components/adsense'

if (isBrowser) {
  Vue.use(AdsenseComponents)
}
