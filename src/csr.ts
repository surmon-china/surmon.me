/**
 * @file Client app entry
 * @module CSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

// polyfills
import 'intersection-observer'

import * as Sentry from '@sentry/vue'
import { computed, watch } from 'vue'
import { createWebHistory } from 'vue-router'
import { createMainApp } from '/@/app/main'
import gtag from '/@/composables/gtag'
import lozad from '/@/composables/lozad'
import adsense from '/@/composables/adsense'
import { createDefer } from '/@/composables/defer'
import { createMusic } from '/@/composables/music'
import { createPopup } from '/@/composables/popup'
import { runTitler, resetTitler } from '/@/effects/titler'
import { consoleSlogan } from '/@/effects/slogan'
import { initCopyrighter } from '/@/effects/copyright'
import { exportAppToGlobal } from '/@/effects/exporter'
import { exportStickyEventsToGlobal } from '/@/effects/sticky'
import { exportEmojiRainToGlobal } from '/@/effects/emoji-23333'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import { getSSRStateValue, getSSRContextData, getSSRContextValue } from '/@/universal'
import { Language, LanguageKey } from '/@/language'
import { APP_VERSION, APP_ENV, isDev, isProd } from '/@/app/environment'
import { META, IDENTITIES } from '/@/config/app.config'
import API_CONFIG from '/@/config/api.config'

import './effects/swiper/style'
import './effects/elements/index.scss'
import './components/common/loading-indicator/index.scss'
import './styles/app.scss'

console.group(`🔵 [SSR:CONTEXT]`)
console.table(getSSRContextData())
console.groupEnd()

// app
const { app, router, head, globalState, i18n, store, getGlobalHead } = createMainApp({
  historyCreator: createWebHistory,
  language: navigator.language,
  userAgent: navigator.userAgent,
  region: getSSRStateValue('region')!,
  layout: getSSRStateValue('layout')!,
  theme: getSSRStateValue('theme')!,
  error: getSSRContextValue('error')
})

// services
const defer = createDefer()
const popup = createPopup()
const music = createMusic({ delay: 668, continueNext: true })

// plugins & services
app.use(music)
app.use(lozad, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })
app.use(adsense, { id: IDENTITIES.GOOGLE_ADSENSE_CLIENT_ID, enabledAutoAd: true })
app.use(gtag, {
  router,
  id: IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  config: { send_page_view: false },
  customResourceURL: '/gtag-script'
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

// init: sentry
Sentry.init({
  app,
  dsn: IDENTITIES.SENTRY_PUBLIC_DSN,
  environment: APP_ENV,
  release: APP_VERSION,
  tracesSampleRate: isDev ? 1.0 : 0.2,
  replaysSessionSampleRate: isDev ? 0.8 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay(),
    new Sentry.BrowserTracing({
      // https://docs.sentry.io/platforms/javascript/performance/instrumentation/automatic-instrumentation/#tracepropagationtargets
      tracePropagationTargets: ['localhost', /^\//, new RegExp('^' + API_CONFIG.NODEPRESS.replaceAll('.', '\\.'))],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    })
  ]
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
          // tltle: zero width character
          // { favicon: '🌝', title: '​' },
          // { favicon: '⛔️', title: 'FORBIDDEN' },
          // { favicon: '⭕️', title: 'FBI WARNING' },
          { favicon: '🌱', title: META.en_sub_title }
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
