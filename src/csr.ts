/**
 * @file Client app entry
 * @module client-entry
 * @author Surmon <https://github.com/surmon-china>
 */

// polyfills
import './polyfills'

import * as Sentry from '@sentry/vue'
import { computed, watch } from 'vue'
import { createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { createMainApp } from '/@/app/main'
import gtag from '/@/composables/gtag'
import lozad from '/@/composables/lozad'
import adsense from '/@/composables/adsense'
import { createDefer } from '/@/composables/defer'
import { createMusic } from '/@/composables/music'
import { createPopup } from '/@/composables/popup'
import { consoleSlogan } from '/@/effects/slogan'
import { initCopyrighter } from '/@/effects/copyright'
import { exportAppToGlobal } from '/@/effects/exporter'
import { exportEmojiRainToGlobal } from '/@/effects/emoji-23333'
import { setStaticTitler, resetTitler } from '/@/effects/titler'
import { getLayoutByRouteMeta } from '/@/constants/layout'
import { getSSRStateValue, getSSRContextData, getSSRContextValue } from '/@/app/universal'
import { Language, LanguageKey } from '/@/language'
import { APP_VERSION, isDev, isProd } from './configs/app.env'
import { APP_META, IDENTITIES } from '/@/configs/app.config'
import API_CONFIG from '/@/configs/app.api'

import './effects/swiper/style'
import './effects/elements/index.scss'
import './components/common/loading-indicator/index.scss'
import './styles/app.scss'
import './styles/font.scss'

console.group(`🔵 [SSR:CONTEXT]`)
console.table(getSSRContextData())
console.groupEnd()

// init: app
const { app, router, globalState, i18n, store, getGlobalHead } = createMainApp({
  routerHistoryCreator: createWebHistory,
  language: navigator.language,
  userAgent: navigator.userAgent,
  region: getSSRStateValue('region')!,
  layout: getSSRStateValue('layout')!,
  theme: getSSRStateValue('theme')!,
  error: getSSRContextValue('error')
})

// init: composables
const defer = createDefer()
const popup = createPopup()
const music = createMusic({ delay: 668, continueNext: true })
const head = createHead({ disableCapoSorting: true })

// init: global head attributes
const globalHeadRef = computed(() => getGlobalHead())
const globalHeadEntry = head.push(globalHeadRef)
watch(globalHeadRef, (newValue) => globalHeadEntry.patch(newValue))

// init: store (from SSR context or fetch)
store.hydrate()

// init: plugins & services
app.use(head)
app.use(music)
app.use(lozad, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })
app.use(gtag, {
  router,
  id: IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  config: { send_page_view: false },
  customResourceURL: '/gtag-script'
})

// enable adsense on desktop only
if (!globalState.userAgent.isMobile) {
  app.use(adsense, { id: IDENTITIES.GOOGLE_ADSENSE_CLIENT_ID, enabledAutoAd: false })
}

// init: services with client
exportEmojiRainToGlobal()
exportAppToGlobal(app)
initCopyrighter()

// init: sentry
if (isProd) {
  Sentry.init({
    app,
    dsn: IDENTITIES.SENTRY_PUBLIC_DSN,
    release: APP_VERSION,
    tracesSampleRate: isDev ? 1.0 : 0.2,
    // replaysSessionSampleRate: isDev ? 0.8 : 0.1,
    // replaysOnErrorSampleRate: 1.0,
    // MARK: replayIntegration ≈ 110kb+, so disabled by default `Sentry.replayIntegration()`
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracePropagationTargets: ['localhost', /^\//, new RegExp('^' + API_CONFIG.NODEPRESS.replaceAll('.', '\\.'))]
  })
}

// router ready -> mount
router.isReady().finally(() => {
  // UI layout: set UI layout by route (for SPA)
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))
  // mount (force hydrate)
  app.mount('#app', true).$nextTick(() => {
    // set hydration state
    globalState.setHydrate()
    // reset i18n language
    i18n.set(globalState.userAgent.isZhUser ? Language.Chinese : Language.English)
    // init user identity state
    store.stores.identity.initOnClient()
    // title surprise (desktop only)
    if (!globalState.userAgent.isMobile) {
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
            { favicon: '🌱', title: APP_META.en_sub_title }
          ]
          const index = Math.floor(Math.random() * surprises.length)
          isHidden ? setStaticTitler(surprises[index]) : resetTitler()
        },
        false
      )
    }
    // production only
    if (isProd) {
      consoleSlogan(i18n.t(LanguageKey.APP_SLOGAN)!, store.stores.appOption.data?.site_email)
    }
  })
})
