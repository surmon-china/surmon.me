/**
 * @file App main
 * @module app/main
 * @author Surmon <https://github.com/surmon-china>
 */

import { createSSRApp } from 'vue'
import type { RouterHistory } from 'vue-router'
import type { SerializableHead } from '@unhead/vue'
import { createUniversalStore } from '/@/stores'
import { createUniversalRouter, RouterCreatorOptions } from './router'
import { createGlobalState, AppErrorValue } from './state'
import { createAppError } from './error'
import { createTheme, Theme } from '/@/composables/theme'
import { createI18n } from '/@/composables/i18n'
import { PageLayout } from '/@/constants/page-layout'
import { Language, LocaleKey, locales } from '/@/locales'
import { APP_MODE, APP_VERSION, isServer } from '/@/configs/app.env'
import API_CONFIG from '/@/configs/app.api'
import register from './register'
import App from './app.vue'

const consoleTable = isServer ? console.info : console.table

console.group(`🔵 [APP:INIT]`)
consoleTable({ APP_VERSION, APP_MODE, NODE_ENV: process.env.NODE_ENV })
console.groupEnd()

console.group(`🔵 [APP:API]`)
consoleTable(API_CONFIG)
console.groupEnd()

export interface AppCreatorContext {
  theme: Theme
  region: string
  languages: string[]
  userAgent: string | undefined
  layout?: PageLayout
  error?: AppErrorValue
  routerHistoryCreator(base?: string): RouterHistory
  routerBeforeMiddleware?(globalState: any): RouterCreatorOptions['beforeMiddleware']
  routerAfterMiddleware?(globalState: any): RouterCreatorOptions['afterMiddleware']
}

export type MainApp = ReturnType<typeof createMainApp>
export const createMainApp = (context: AppCreatorContext) => {
  // 1. create app
  const app = createSSRApp(App)

  // 2. global state
  const globalState = createGlobalState({
    userAgent: context.userAgent || '',
    languages: context.languages || [],
    layout: context.layout ?? PageLayout.Normal,
    error: context.error ?? null
  })

  // 3. store
  const store = createUniversalStore({ globalState })

  // 4. router
  const router = createUniversalRouter({
    beforeMiddleware: context.routerBeforeMiddleware?.(globalState),
    afterMiddleware: context.routerAfterMiddleware?.(globalState),
    history: context.routerHistoryCreator()
  })

  // 5. composables
  const theme = createTheme(context.theme)
  const i18n = createI18n({
    default: globalState.userAgent.isZhUser ? Language.Chinese : Language.English,
    keys: Object.values(LocaleKey),
    locales
  })

  // get global head attributes: for CSR / SSR
  const getGlobalHead = (): SerializableHead => ({
    htmlAttrs: {
      lang: i18n.l.value?.iso ?? '',
      'data-region': context.region,
      'data-theme': theme.theme.value,
      'data-device': globalState.userAgent.isMobile ? 'mobile' : 'desktop'
    }
  })

  // handle global error: https://vuejs.org/api/application#app-config-errorhandler
  app.config.errorHandler = (error) => globalState.setError(error)
  // handle router error: https://router.vuejs.org/api/interfaces/Router.html#onError-
  router.onError((error) => globalState.setError(error))

  // handle router validate error & 404 error
  // https://router.vuejs.org/guide/advanced/navigation-guards.html#Optional-third-argument-next
  router.beforeEach((to, _, next) => {
    if (to.meta.validator) {
      to.meta
        .validator({ route: to, i18n, store })
        .then(next)
        .catch((error) => {
          // client: next(error) > router error > global state error
          // server: next(error) > router error > render catch error
          next(createAppError(error.message, error.code))
        })
    } else {
      next()
    }
  })

  // app plugins
  app.use(router)
  app.use(store)
  app.use(globalState)
  app.use(i18n)
  app.use(theme)

  // components and directives
  app.use(register)

  return {
    app,
    router,
    store,
    globalState,
    i18n,
    theme,
    getGlobalHead
  }
}
