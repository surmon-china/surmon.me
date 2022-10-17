/**
 * @file Client app entry
 * @module CSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

// polyfills
import 'intersection-observer'

import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { createVueApp } from '/@/app/main'
import { LayoutColumn } from '/@/app/state'
import { getSSRContext } from '/@/universal'
import gtag from '/@/composables/gtag'
import lozad from '/@/composables/lozad'
import adsense from '/@/composables/adsense'
import { createDefer } from '/@/composables/defer'
import { createMusic } from '/@/composables/music'
import { createPopup } from '/@/composables/popup'
import { createLoading } from '/@/composables/loading'
import { getClientLocalTheme } from '/@/composables/theme'
import amplitude from '/@/effects/amplitude'
import { runTitler, resetTitler } from '/@/effects/titler'
import { consoleSlogan } from '/@/effects/slogan'
import { initCopyrighter } from '/@/effects/copyright'
import { exportAppToGlobal } from '/@/effects/exporter'
import { exportStickyEventsToGlobal } from '/@/effects/sticky'
import { exportEmojiRainToGlobal } from '/@/effects/emoji-23333'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import { getTargetCDNURL } from '/@/transforms/url'
import { randomNumber } from '/@/utils/random'
import { Language, LanguageKey } from '/@/language'
import { IDENTITIES } from '/@/config/app.config'
import { isSSR } from '/@/app/environment'
import { isProd } from '/@/environment'

import './effects/swiper/style'
import './effects/elements/index.scss'
import './styles/app.scss'

// app
const { app, router, globalState, i18n, store } = createVueApp({
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
const music = createMusic({ amplitude, autoInit: false })

// plugins & services
app.use(music)
app.use(lozad, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })
app.use(loading, { exportToGlobal: true })
app.use(adsense, { ID: IDENTITIES.GOOGLE_ADSENSE_PUBLISHER_ID, enabledAutoAD: true })
app.use(gtag, {
  router,
  id: IDENTITIES.GOOGLE_ANALYTICS_TRACKING_ID,
  config: { send_page_view: false },
  customResourceURL: getTargetCDNURL('/effects/gtag')
})

// init: store (from SSR context or fetch)
isSSR ? store.initOnSSRClient() : store.initOnSPAClient()

// init: services with client
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
    i18n.set(globalState.userAgent.isZhUser ? Language.Chinese : Language.English)
    // init user identity state
    store.stores.identity.initOnClient()
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
    // production only
    if (isProd) {
      consoleSlogan(i18n.t(LanguageKey.APP_SLOGAN)!, store.stores.appOption.data?.site_email)
    }
  })
})
