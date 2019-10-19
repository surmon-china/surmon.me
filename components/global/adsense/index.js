/**
 * @file Adsense box component / ES module
 * @module components/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import AdsenseArchive from './archive'
import AdsenseArchiveMobile from './archive-mobile'
import AdsenseCommonResponsive from './responsive'

const adsense = {
  install(Vue) {
    Vue.component(AdsenseArchive.name, AdsenseArchive)
    Vue.component(AdsenseArchiveMobile.name, AdsenseArchiveMobile)
    Vue.component(AdsenseCommonResponsive.name, AdsenseCommonResponsive)
  }
}

export default adsense
