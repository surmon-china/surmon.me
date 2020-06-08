import { Request } from 'express'
import { createSSRApp } from 'vue'
import { createWebHistory, createMemoryHistory } from 'vue-router'
import { VueEnv } from '/@/vuniversal/env'
import { createUniversalRouter } from './router'
import { createUniversalStore } from './store'
import { createI18n } from '/@/services/i18n'
import { createClientOnlyComponent } from '/@/services/client-only'
import { createTheme, Theme } from '/@/services/theme'
import enhancer from '/@/services/enhancer'
import { Language, languages, langMap } from '/@/language/data'
import { createGlobalState } from './state'
import App from './app.vue'

import '/@/assets/styles/app.scss'

export interface ICreaterContext {
  target: VueEnv
  request?: Request
}

export const createVueApp = (context: ICreaterContext) => {
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

  const app = createSSRApp(App)
  const store = createUniversalStore()
  const router = createUniversalRouter({
    globalState,
    history: isServer
      ? createMemoryHistory()
      : createWebHistory()
  })

  const theme = createTheme(Theme.Default)
  const i18n = createI18n({
    default: globalState.userAgent.isZhUser
      ? Language.Zh
      : Language.En,
    languages,
    map: langMap
  })

  const ClientOnly = createClientOnlyComponent(context.target)
  app.component(ClientOnly.name, ClientOnly)

  const services = {
    router,
    store,
    globalState,
    i18n,
    theme,
    enhancer
  }

  Object.values(services).forEach(app.use)
  return { app, ...services }
}
