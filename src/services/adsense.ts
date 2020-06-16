/**
 * @file Google Adsense
 * @module services/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import vueScript2 from 'vue-script2'
import Ads from 'vue-google-adsense'
import AdsenseArchive from '/@/components/common/adsense/archive.vue'
import AdsenseArchiveMobile from '/@/components/common/adsense/archive-mobile.vue'
import AdsenseCommonResponsive from '/@/components/common/adsense/responsive.vue'

export default {
  install(app: App) {
    app.use(vueScript2)
    app.use(Ads.Adsense)
    app.use(Ads.InArticleAdsense)
    app.use(Ads.InFeedAdsense)
    app.use(Ads.AutoAdsense, { adClient: 'ca-pub-4710915636313788' })

    ;[
      AdsenseArchive,
      AdsenseArchiveMobile,
      AdsenseCommonResponsive
    ].forEach(
      component => app.component(component.name as string, component)
    )
  }
}
