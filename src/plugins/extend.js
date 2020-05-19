/**
 * @file Vue extends / ES module
 * @module plugins/vue-extends
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import filters from '~/filters'
import apiConfig from '~/config/api.config'
import i18nConfig from '~/config/i18n.config'
import { i18nTransfer } from '~/transformers/i18n'

import EmptyBox from '~/components/common/empty'
import LoadingBox from '~/components/common/loading'
import CommentBox from '~/components/common/comment'
import SkeletonBox from '~/components/common/skeleton'
import GoogleAdsense from '~/components/common/adsense'

const i18nData = i18nTransfer(i18nConfig)

// apis
Vue.prototype.$API = apiConfig

// filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.component(EmptyBox.name, EmptyBox)
Vue.component(LoadingBox.name, LoadingBox)
Vue.use(CommentBox)
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
