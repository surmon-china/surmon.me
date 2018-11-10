/**
 * @file Vue extends / ES module
 * @module plugins/vue-extends
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import filters from '~/filters'
import apiConfig from '~/api.config'
import i18nConfig from '~/i18n.config'
import i18nTransfer from '~/utils/i18n-transfer'

import EmptyBox from '~/components/common/empty'
import LoadingBox from '~/components/common/loading'
import CommentBox from '~/components/common/comment'
import WallFlowerBox from '~/components/common/wall-flower'
import ColorBlockBox from '~/components/common/color-block'

// adsense
import AdsenseComponents from '~/components/adsense'

const i18nData = i18nTransfer(i18nConfig)

// cdn
Vue.prototype.cdnUrl = apiConfig.cdnUrl
Vue.prototype.proxyUrl = apiConfig.proxyUrl

// filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.use(EmptyBox)
Vue.use(CommentBox)
Vue.use(LoadingBox)
Vue.use(WallFlowerBox)
Vue.use(ColorBlockBox)

// adsense
Vue.use(AdsenseComponents)

// mixins
Vue.mixin({
  computed: {
    $i18n() {
      return i18nData[this.$store.state.option.language]
    }
  }
})
