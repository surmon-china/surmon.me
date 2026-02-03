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
import type { SerializableHead } from '@unhead/vue'
import { createMainApp } from '/@/app/main'
import { useAppOptionsStore } from '/@/stores/foundation'
import { useIdentityStore } from '/@/stores/identity'
import { useGoLinksStore } from '/@/stores/go-links'

import { gtag } from '/@/composables/gtag'
import { lozad } from '/@/composables/lozad'
import { adsense } from '/@/composables/adsense'
import { Theme } from '/@/composables/theme'
import { createDefer } from '/@/composables/defer'
import { createPopup } from '/@/composables/popup'
import { consoleSlogan } from '/@/effects/slogan'
import { initCopyrighter } from '/@/effects/copyright'
import { exportAppToGlobal } from '/@/effects/exporter'
import { exportEmojiRainToGlobal } from '/@/effects/emoji-23333'
import { setFavicon, recoverFavicon } from '/@/effects/faviconer'
import { setTitle, recoverTitle } from '/@/effects/titler'
import { resolvePageLayout } from '/@/constants/page-layout'
import { getSSRStateValue, getSSRContextData, getSSRContextValue } from '/@/app/universal'
import { Language, LocalesKey } from '/@/locales'
import { APP_VERSION, isDev, isProd } from './configs/app.env'
import { APP_PROFILE, IDENTITIES, BFF_CONFIG } from '/@/configs/app.config'

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
  languages: navigator.languages as string[],
  userAgent: navigator.userAgent,
  theme: (window.initialTheme as Theme) ?? Theme.Light,
  region: getSSRStateValue('region')!,
  layout: getSSRStateValue('layout')!,
  error: getSSRContextValue('error')
})

// init: composables
const defer = createDefer()
const popup = createPopup()
const head = createHead({ disableCapoSorting: true })

// init: global head attributes
const globalHeadRef = computed<SerializableHead>(() => {
  const bodyAttrs = globalState.switcher.bodyScrollable ? {} : { class: 'unscrollable' }
  return { ...getGlobalHead(), bodyAttrs }
})
const globalHeadEntry = head.push(globalHeadRef)
watch(globalHeadRef, (newValue) => globalHeadEntry.patch(newValue))

// init: store (from SSR context or fetch)
store.hydrateOnClient()

// init: plugins & services
app.use(head)
app.use(lozad, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })
app.use(adsense, { id: IDENTITIES.GOOGLE_ADSENSE_CLIENT_ID })
app.use(gtag, {
  router,
  id: IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  config: { send_page_view: false },
  customResourceUrl: BFF_CONFIG.route_path_gtag_script
})

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
    // Disabling distributed tracing to ensure no trace headers ('sentry-trace', 'baggage') are sent.
    // https://docs.sentry.io/platforms/javascript/tracing/distributed-tracing/#disabling-distributed-tracing
    tracePropagationTargets: []
  })
}

// router ready -> mount
router.isReady().finally(() => {
  // UI layout: set UI layout by route (for SPA)
  globalState.setPageLayout(resolvePageLayout(router.currentRoute.value.meta.layout))
  // mount (force hydrate)
  app.mount('#app', true).$nextTick(() => {
    // set hydration state
    globalState.setHydrate()
    // reset i18n language
    i18n.set(globalState.userAgent.isZhUser ? Language.Chinese : Language.English)
    // init user identity state
    useIdentityStore(store.pinia).initOnClient()
    // init go url map state
    useGoLinksStore(store.pinia).fetchRemoteLinksMap()
    // title surprise (desktop only)
    if (!globalState.userAgent.isMobile) {
      document.addEventListener(
        'visibilitychange',
        (event) => {
          const surprises = [
            // { favicon: '⛔️', title: 'FORBIDDEN' },
            // { favicon: '⭕️', title: 'FBI WARNING' },
            { favicon: '🙏🏽', title: 'Namo Buddhaya' },
            { favicon: '☸️', title: 'Dhammaṁ saraṇaṁ gacchāmi' },
            { favicon: '🧘🏽‍♂️', title: APP_PROFILE.sub_title_en }
          ]
          const surprise = surprises[Math.floor(Math.random() * surprises.length)]
          // @ts-ignore
          if (event.target?.hidden || event.target?.webkitHidden) {
            setFavicon(surprise.favicon)
            setTitle(surprise.title)
          } else {
            recoverFavicon()
            recoverTitle()
          }
        },
        false
      )
    }
    // production only
    if (isProd) {
      consoleSlogan(i18n.t(LocalesKey.APP_SLOGAN)!, useAppOptionsStore(store.pinia).data?.site_email)
    }
  })
})
