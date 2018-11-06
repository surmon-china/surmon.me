/**
 * @file Adsense box component / ES module
 * @module components/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import AdsenseAside from './aside'
import AdsenseArchive from './archive'
import AdsenseArticle from './article'
import AdsenseArticleMobile from './archive-mobile'

const adsense = {
  install(Vue) {
    Vue.component(AdsenseAside.name, AdsenseAside)
    Vue.component(AdsenseArchive.name, AdsenseArchive)
    Vue.component(AdsenseArticle.name, AdsenseArticle)
    Vue.component(AdsenseArticleMobile.name, AdsenseArticleMobile)
  }
}

export default adsense
