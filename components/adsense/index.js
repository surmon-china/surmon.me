/**
 * @file Adsense box component / ES module
 * @module components/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import AdsenseAside from './aside'
import AdsenseArchive from './archive'
import AdsenseArticle from './article'

const adsense = {
  install(Vue) {
    Vue.component(AdsenseAside.name, AdsenseAside)
    Vue.component(AdsenseArticle.name, AdsenseArticle)
    Vue.component(AdsenseArchive.name, AdsenseArchive)
  }
}

export default adsense
