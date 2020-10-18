/**
 * @file App main
 * @module app.main
 * @author Surmon <https://github.com/surmon-china>
 */

import { Request } from 'express'
import { createSSRApp, createApp } from 'vue'
import { createWebHistory, createMemoryHistory } from 'vue-router'
import { VueEnv } from '/@/vuniversal/env'
import { RouteName } from './router'
import { createUniversalRouter } from './router'
import { createUniversalStore } from './store'
import { createI18n } from '/@/services/i18n'
import { createClientOnly } from '/@/services/client-only'
import { createTheme, Theme } from '/@/services/theme'
import { getLayoutMiddleware } from '/@/services/layout'
import interior from './services/interior'
import { Language, languages, langMap } from '/@/language/data'
import { createGlobalState } from './state'
import App from './app.vue'

import '/@/assets/styles/app.scss'

export interface ICreaterContext {
  target: VueEnv
  request?: Request
}

export const createVueApp = (context: ICreaterContext) => {
  // TODO: HACK
  process.env.VUE_ENV = context.target
  const isServer = context.target === VueEnv.Server
  const language = isServer
    ? context.request?.headers['accept-language'] || ''
    : navigator.language
  const userAgent = isServer
    ? context.request?.headers['user-agent'] || ''
    : navigator.userAgent

  const globalState = createGlobalState({
    userAgent,
    language
  })

  const app = createApp(App)
  const store = createUniversalStore({ globalState })
  const router = createUniversalRouter({
    beforeMiddleware: getLayoutMiddleware(globalState),
    history: isServer
      ? createMemoryHistory()
      : createWebHistory()
  })
  if (globalState.userAgent.isMobile) {
    router.removeRoute(RouteName.Music)
  }

  const theme = createTheme(Theme.Default)
  const i18n = createI18n({
    default: globalState.userAgent.isZhUser
      ? Language.Zh
      : Language.En,
    languages,
    map: langMap
  })

  router.onError(error => {
    console.log('router 有错', error)
  })

  app.use(router)
  app.use(store)
  app.use(globalState)
  app.use(i18n)
  app.use(theme)
  app.use(interior)
  app.use(createClientOnly(context.target))

  return {
    app,
    router,
    store,
    globalState,
    i18n,
    theme,
    interior
  }
}
