/**
 * @file Adsense box component / ES module
 * @module components/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import AdsenseArchive from './archive'
import AdsenseResponsive from './responsive'
import AdsenseArticleMobile from './archive-mobile'

const adsense = {
  install(Vue) {
    Vue.component(AdsenseArchive.name, AdsenseArchive)
    Vue.component(AdsenseResponsive.name, AdsenseResponsive)
    Vue.component(AdsenseArticleMobile.name, AdsenseArticleMobile)
  }
}

export default adsense
