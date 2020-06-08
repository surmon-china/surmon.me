/**
 * @file GA 统计服务 / ES module
 * @module plugins/analytics
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import { Router } from 'vue-router'
// import VueAnalytics from 'vue-analytics'
import { isProd } from '/@/vuniversal/env'
import { getFileCDNUrl } from '/@/transformers/url'

// MARK: https://zh.nuxtjs.org/faq/ga

export const enableAnalytics = (app: App, router: Router) => {
  // app.use(VueAnalytics, {
  //   id: 'UA-84887611-3',
  //   router: router,
  //   customResourceURL: getFileCDNUrl('/scripts/analytics.js'),
  //   autoTracking: {
  //     exception: true,
  //     screenview: true
  //   },
  //   debug: {
  //     sendHitTask: isProd
  //   },
  //   onReady() {
  //     // Vue.$ga.require('displayfeatures')
  //   }
  // })
}
