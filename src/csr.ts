/**
 * @file Client app entry
 * @author Surmon <https://github.com/surmon-china>
 */

import './polyfill'

import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { GA_MEASUREMENT_ID, ADSENSE_CLIENT_ID } from '/@/config/app.config'
import { isProd, isSSR } from './environment'
import { Language } from '/@/language/data'
import { getFileCDNUrl } from '/@/transforms/url'
import amplitude from './patches/amplitude'
import gtag from '/@/services/gtag'
import adsense from '/@/services/adsense'
import swiper from '/@/services/swiper'
import { getClientLocalTheme } from '/@/services/theme'
import { getLayoutByRouteMeta } from '/@/services/layout'
import { createDefer } from '/@/services/defer'
import { createMusic } from '/@/services/music'
import { createPopup } from '/@/services/popup'
import { createLoading } from '/@/services/loading'
import { consoleSlogan } from '/@/services/slogan'
import { enableCopyright } from '/@/services/copyright'
import { enableBaiduSeoPush } from '/@/services/baidu-seo-push'
import { enableAutoTitleSurprise } from './services/title-surprise'
import { exportEmojiRainToGlobal } from './services/emoji-23333'
import { exportStickyEventsToGlobal } from './services/sticky'
import { exportAppToGlobal } from '/@/services/exporter'
import { exportLozadToGlobal } from '/@/services/lozad'
import { initSocketAndExport } from '/@/services/socket.io'
import { getSSRContextData } from './universal'
import { createVueApp } from '/@/app/main'

import '/@/styles/app.scss'

// services
const defer = createDefer()
const loading = createLoading()
const music = createMusic({ amplitude, autoStart: false })

// app
const ssrContextState = getSSRContextData()
const { app, router, globalState, theme, i18n, helmet, store } = createVueApp({
  historyCreator: createWebHistory,
  appCreator: isSSR ? createSSRApp : createApp,
  language: isSSR ? ssrContextState.globalState.language : navigator.language,
  userAgent: isSSR ? ssrContextState.globalState.userAgent : navigator.userAgent,
  theme: isSSR ? ssrContextState.theme : getClientLocalTheme()
})

// plugins & services
app.use(swiper)
app.use(music)
app.use(loading, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(createPopup(), { exportToGlobal: true })
app.use(adsense, { ID: ADSENSE_CLIENT_ID, enabledAutoAD: true })
app.use(gtag, {
  router,
  id: GA_MEASUREMENT_ID,
  customResourceURL: getFileCDNUrl('/scripts/gtag.js')
})

// init: store (from SSR context or fetch)
isSSR ? store.clientSSRInit() : store.clientInit()

// init: error (from SSR context only)
if (isSSR) {
  if (ssrContextState.globalState.renderError) {
    globalState.setRenderError(ssrContextState.globalState.renderError)
  }
}

// init: services with client
helmet.bindClient()
theme.bindClientSystem()
initSocketAndExport()
exportLozadToGlobal()
exportEmojiRainToGlobal()
exportStickyEventsToGlobal()
exportAppToGlobal(app)

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
  // UI layout
  globalState.setLayoutColumn(
    isSSR
      ? // reset UI layout by SSR context (for SSR)
        ssrContextState.globalState.layout
      : // set UI layout by route (for SPA)
        getLayoutByRouteMeta(router.currentRoute.value.meta)
  )

  // mount (isHydrate -> (SSR -> true | SPA -> false))
  app.mount('#app', isSSR).$nextTick(() => {
    // set hydrate state
    globalState.setHydrate()
    // reset: global state
    globalState.resetOnClient()
    // reset: i18n language
    i18n.set(globalState.userAgent.isZhUser ? Language.Zh : Language.En)

    // Desktop
    if (!globalState.userAgent.isMobile) {
      defer.addTask(music.start)
      enableAutoTitleSurprise()
    }

    // Production
    if (isProd) {
      enableCopyright()
      enableBaiduSeoPush(router)
      consoleSlogan(i18n)
    }
  })
})
