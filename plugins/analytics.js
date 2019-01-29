/**
 * @file GA 统计服务 / ES module
 * @module plugins/analytics
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import { isBrowser, isProdMode } from '~/environment/esm'

if (isBrowser) {
  
  // 新版本解决方案
  window.onNuxtReady(app => {
    Vue.use(VueAnalytics, {
      id: 'UA-84887611-3',
      router: window.$nuxt.$router,
      customResourceURL: '/scripts/analytics.js',
      autoTracking: {
        exception: true,
        screenview: true
      },
      debug: {
        sendHitTask: isProdMode
      },
      onReady() {
        Vue.$ga.require('displayfeatures')
      }
    })
  })
}
