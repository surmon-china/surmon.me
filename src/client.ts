/**
 * @file App client entry
 * @module app/client
 * @author Surmon <https://github.com/surmon-china>
 */

import './polyfill'

import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { MUSIC_ALBUM_ID, GA_MEASUREMENT_ID, ADSENSE_CLIENT_ID } from '/@/config/app.config'
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
import { exportAppToGlobal } from '/@/services/exporter'
import { exportLozadToGlobal } from '/@/services/lozad'
import { initSocketAndExport } from '/@/services/socket.io'
import { getSSRContextData } from './universal'
import { createVueApp } from './main'

import '/@/assets/styles/app.scss'

const defer = createDefer()
const loading = createLoading()
const music = createMusic({
  amplitude,
  albumId: MUSIC_ALBUM_ID,
  autoStart: false
})
const ssrContextState = getSSRContextData()
const { app, router, globalState, theme, i18n, helmet, store } = createVueApp({
  historyCreator: createWebHistory,
  appCreator: isSSR
    ? createSSRApp
    : createApp,
  language: isSSR
    ? ssrContextState.globalState.language
    : navigator.language,
  userAgent: isSSR
    ? ssrContextState.globalState.userAgent
    : navigator.userAgent,
  theme: isSSR
    ? ssrContextState.theme
    : getClientLocalTheme()
})

app.use(swiper)
app.use(music)
app.use(loading, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(createPopup(), { exportToGlobal: true })
app.use(adsense, { ID: ADSENSE_CLIENT_ID, enabledAutoAD: true })
app.use(gtag, {
  router,
  id: GA_MEASUREMENT_ID,
  customResourceURL: getFileCDNUrl('/scripts/gtag.js'),
})

// init: store
isSSR
  ? store.clientSSRInit()
  : store.clientInit()

// init: services
helmet.bindClient()
theme.bindClientSystem()
initSocketAndExport()
exportLozadToGlobal()
exportEmojiRainToGlobal()
exportAppToGlobal(app)

// init: router loading middleware
router.beforeEach((_, __, next) => {
  loading.start()
  next()
})
router.afterEach((_, __, failure) => {
  failure
    ? loading.fail(failure)
    : loading.finish()
})

// router ready -> mount
router.isReady().then(() => {
  // UI layout
  globalState.layoutColumn.setValue(
    isSSR
      ? ssrContextState.globalState.layout
      : getLayoutByRouteMeta(router.currentRoute.value.meta)
  )

  // mount (isHydrate -> (SSR -> true | SPA -> false))
  app.mount('#app', isSSR).$nextTick(() => {
    // set hydrate state
    globalState.setHydrate()
    // reset: global state
    globalState.resetOnClient()
    // reset: i18n language
    i18n.set(
      globalState.userAgent.isZhUser
        ? Language.Zh
        : Language.En
    )

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
