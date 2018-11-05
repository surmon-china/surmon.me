/**
 * @file Google adsense / ES module
 * @module plugins/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
