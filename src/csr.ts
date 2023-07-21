/**
 * @file Client app entry
 * @module CSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

// polyfills
import 'intersection-observer'

import { computed, watch } from 'vue'
import { createWebHistory } from 'vue-router'
import { createMainApp } from '/@/app/main'
import { getSSRContext } from '/@/universal'
import gtag from '/@/composables/gtag'
import lozad from '/@/composables/lozad'
import adsense from '/@/composables/adsense'
import { createDefer } from '/@/composables/defer'
import { createMusic } from '/@/composables/music'
import { createPopup } from '/@/composables/popup'
import { createLoading } from '/@/composables/loading'
import amplitude from '/@/effects/amplitude'
import { runTitler, resetTitler } from '/@/effects/titler'
import { consoleSlogan } from '/@/effects/slogan'
import { initCopyrighter } from '/@/effects/copyright'
import { exportAppToGlobal } from '/@/effects/exporter'
import { exportStickyEventsToGlobal } from '/@/effects/sticky'
import { exportEmojiRainToGlobal } from '/@/effects/emoji-23333'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import { getCDN_URL } from '/@/transforms/url'
import { Language, LanguageKey } from '/@/language'
import { IDENTITIES } from '/@/config/app.config'
import { isProd } from '/@/environment'

import './effects/swiper/style'
import './effects/elements/index.scss'
import './styles/app.scss'

// app
const { app, router, head, globalState, i18n, store, getGlobalHead } = createMainApp({
  historyCreator: createWebHistory,
  language: navigator.language,
  userAgent: navigator.userAgent,
  layout: getSSRContext('layout'),
  theme: getSSRContext('theme')
})

// services
const defer = createDefer()
const popup = createPopup()
const loading = createLoading()
const music = createMusic({ amplitude })

// plugins & services
app.use(music)
app.use(lozad, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })
app.use(loading, { exportToGlobal: true })
app.use(adsense, { id: IDENTITIES.GOOGLE_ADSENSE_CLIENT_ID, enabledAutoAd: true })
app.use(gtag, {
  router,
  id: IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  config: { send_page_view: false },
  customResourceURL: getCDN_URL('/effects/gtag')
})

// init: store (from SSR context or fetch)
store.hydrate()

// init: services with client
exportEmojiRainToGlobal()
exportStickyEventsToGlobal()
exportAppToGlobal(app)
initCopyrighter()

// init global head attributes: https://unhead.harlanzw.com/api/core/push
const globalHead = computed(() => getGlobalHead())
const mainHead = head.push(globalHead, { mode: 'client' })
watch(globalHead, (newValue) => mainHead.patch(newValue))

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
  // mount (force hydrate)
  app.mount('#app', true).$nextTick(() => {
    // set hydration state
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
          { favicon: '⛔️', title: 'FORBIDDEN' },
          { favicon: '⭕️', title: 'FBI WARNING' },
          // tltle: zero width character
          { favicon: '🌝', title: '​' }
        ]
        const index = Math.floor(Math.random() * surprises.length)
        isHidden ? runTitler(surprises[index]) : resetTitler()
      },
      false
    )
    // production only
    if (isProd) {
      consoleSlogan(i18n.t(LanguageKey.APP_SLOGAN)!, store.stores.appOption.data?.site_email)
    }
  })
})
