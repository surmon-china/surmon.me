/**
 * @file Vue extends / ES module
 * @module plugins/vue-extends
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import filters from '~/filters'
import apiConfig from '~/config/api.config'
import i18nConfig from '~/config/i18n.config'
import { i18nTransfer } from '~/transforms/i18n'

import EmptyBox from '~/components/global/empty'
import LoadingBox from '~/components/global/loading'
import CommentBox from '~/components/global/comment'
import ColorBlockBox from '~/components/global/color-block'
import SkeletonBox from '~/components/global/skeleton'
import GoogleAdsense from '~/components/global/adsense'

const i18nData = i18nTransfer(i18nConfig)

// apis
Vue.prototype.$API = apiConfig

// filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.use(EmptyBox)
Vue.use(CommentBox)
Vue.use(LoadingBox)
Vue.use(ColorBlockBox)
Vue.use(SkeletonBox)
Vue.use(GoogleAdsense)

// mixins
Vue.mixin({
  computed: {
    $i18n() {
      return i18nData[this.$store.state.global.language]
    }
  }
})
