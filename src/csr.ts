/**
 * @file Client app entry
 * @module CSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

// polyfills
import 'intersection-observer'

import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { GA_MEASUREMENT_ID, ADSENSE_CLIENT_ID } from '/@/config/app.config'
import { isSSR } from '/@/app/environment'
import { Language } from '/@/language/data'
import { getFileCDNUrl } from '/@/transforms/url'
import amplitude from '/@/services/amplitude'
import gtag from '/@/services/gtag'
import adsense from '/@/services/adsense'
import { getClientLocalTheme } from '/@/services/theme'
import { LayoutColumn, getLayoutByRouteMeta } from '/@/services/layout'
import { createDefer } from '/@/services/defer'
import { createMusic } from '/@/services/music'
import { createPopup } from '/@/services/popup'
import { createLoading } from '/@/services/loading'
import { consoleSlogan } from '/@/services/slogan'
import { initCopyrighter } from '/@/services/copyright'
import { enableBaiduSEOer } from '/@/services/baidu-seo-push'
import { runTitler, resetTitler } from '/@/services/titler'
import { exportEmojiRainToGlobal } from '/@/services/emoji-23333'
import { exportStickyEventsToGlobal } from '/@/services/sticky'
import { exportAppToGlobal } from '/@/services/exporter'
import { exportLozadToGlobal } from '/@/services/lozad'
import { randomNumber } from '/@/utils/random'
import { createVueApp } from '/@/app/main'
import { getSSRContext } from '/@/universal'
import { isProd } from '/@/environment'

import '/@/services/swiper/style'
import '/@/styles/app.scss'

// app
const { app, router, globalState, theme, i18n, store } = createVueApp({
  historyCreator: createWebHistory,
  appCreator: isSSR ? createSSRApp : createApp,
  language: navigator.language,
  userAgent: navigator.userAgent,
  layout: isSSR ? getSSRContext('layout') : LayoutColumn.Normal,
  theme: isSSR ? getSSRContext('theme') : getClientLocalTheme()
})

// services
const defer = createDefer()
const popup = createPopup()
const loading = createLoading()
const music = createMusic({ amplitude, autoStart: false })

// plugins & services
app.use(music)
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })
app.use(loading, { exportToGlobal: true })
app.use(adsense, { ID: ADSENSE_CLIENT_ID, enabledAutoAD: true })
app.use(gtag, {
  router,
  id: GA_MEASUREMENT_ID,
  config: { send_page_view: false },
  customResourceURL: getFileCDNUrl('/gtag.js')
})

// init: store (from SSR context or fetch)
isSSR ? store.initOnSSRClient() : store.initOnSPAClient()

// init: services with client
theme.bindClientSystem()
exportLozadToGlobal()
exportEmojiRainToGlobal()
exportStickyEventsToGlobal()
exportAppToGlobal(app)
initCopyrighter()

// init: router loading middleware client only
router.beforeEach((_, __, next) => {
  loading.start()
  next()
})
router.afterEach((_, __, failure) => {
  failure ? loading.fail(failure) : loading.finish()
})

// router ready -> mount
router.isReady().finally(() => {
  // UI layout: set UI layout by route (for SPA)
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))

  // mount (isHydrate -> (SSR -> true | SPA -> false))
  app.mount('#app', isSSR).$nextTick(() => {
    // set hydrate state
    globalState.setHydrate()
    // reset: i18n language
    i18n.set(globalState.userAgent.isZhUser ? Language.Zh : Language.En)
    // init universal user state
    store.stores.universal.initOnClient()

    // desktop only
    if (!globalState.userAgent.isMobile) {
      // bing wallpaper
      defer.addTask(store.stores.wallpaper.fetchPapers)
      // music player
      defer.addTask(music.start)
      // title surprise
      document.addEventListener(
        'visibilitychange',
        (event) => {
          // @ts-ignore
          const isHidden = event.target?.hidden || event.target?.webkitHidden
          const surprises = [
            { favicon: '🔞', title: 'FBI WARNING' },
            { favicon: '⭕️', title: 'FBI WARNING' },
            // tltle: zero width character
            { favicon: '🌝', title: '​' }
          ]
          isHidden ? runTitler(surprises[randomNumber(surprises.length - 1)]) : resetTitler()
        },
        false
      )
    }

    // production only
    if (isProd) {
      enableBaiduSEOer(router)
      consoleSlogan(i18n, store.stores.meta.appOptions.data?.site_email)
    }
  })
})
