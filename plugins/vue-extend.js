/**
 * @file Vue extends / ES module
 * @author Surmon <surmon@foxmail.com>
 */

import Vue from 'vue'
import filters from '~/filters'
import apiConfig from '~/api.config'
import i18nConfig from '~/i18n.config'
import i18nTransfer from '~/utils/i18n-transfer'

import VueEmpty from '~/components/common/vue-empty'
import VueLoading from '~/components/common/vue-loading'
import VueComment from '~/components/common/vue-comment'
import VueWallFlower from '~/components/common/vue-wall-flower'

const i18nData = i18nTransfer(i18nConfig)

// cdn
Vue.prototype.cdnUrl = apiConfig.cdnUrl

// filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.use(VueEmpty)
Vue.use(VueComment)
Vue.use(VueLoading)
Vue.use(VueWallFlower)

// mixins
Vue.mixin({
  computed: {
    $i18n() {
      return i18nData[this.$store.state.option.language]
    }
  }
})
