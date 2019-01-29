/**
 * @file 客户端百度 SEO 服务 / ES module
 * @module plugins/baidu-seo-push
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser, isProdMode } from '~/environment/esm'

if (isProdMode && isBrowser) {
  /*
  ** 百度seo-自动push脚本
  ** https://zz.bdstatic.com/linksubmit/push.js
  */
  const baiduPush = href => {
    (function() {
      const e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi
      const r = href || window.location.href
      const t = document.referrer
      if (!e.test(r)) {
        let o = "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif"
        t ? (o += "?r=" + encodeURIComponent(document.referrer), r && (o += "&l=" + r)) : r && (o += "?l=" + r)
        const i = new Image
        i.src = o
      }
    }(window))
  }

  baiduPush()

  /*
  ** 应用挂载后
  */
  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', to => {
      baiduPush(window.location.origin + to.fullPath)
    })
  })
}
