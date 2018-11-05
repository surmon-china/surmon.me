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
    Vue.component(AdsenseArchive.name, AdsenseArchive)
    Vue.component(AdsenseArticle.name, AdsenseArticle)
  }
}

export default adsense
