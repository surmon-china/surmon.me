/**
 * @file 客户端百度 SEO 服务
 * @module service/baidu-seo-push
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from 'vue-router'

export const enableBaiduSeoPush = (router: Router) => {
  // Fork from https://zz.bdstatic.com/linksubmit/push.js
  const pushUrl = (url: string) => {
    const e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi
    const r = url
    const t = document.referrer
    if (!e.test(r)) {
      let o = "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif"
      t ? (o += "?r=" + encodeURIComponent(document.referrer), r && (o += "&l=" + r)) : r && (o += "?l=" + r)
      const i = new Image
      i.src = o
    }
  }

  // app ready
  pushUrl(window.location.href)
  router.afterEach(to => {
    pushUrl(window.location.origin + to.fullPath)
  })
}