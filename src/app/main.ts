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
import { createGlobalState, LayoutColumn, RenderErrorValue } from './state'
import { createTheme, Theme } from '/@/composables/theme'
import { createI18n } from '/@/composables/i18n'
import { Language, LanguageKey, languages } from '/@/language'
import { APP_MODE, APP_VERSION } from '/@/configs/app.env'
import API_CONFIG from '/@/configs/app.api'
import register from './register'
import App from './app.vue'

console.group(`🔵 [APP:INIT]`)
console.table({ APP_VERSION, APP_MODE, NODE_ENV: process.env.NODE_ENV })
console.groupEnd()

console.group(`🔵 [APP:API]`)
console.table(API_CONFIG)
console.groupEnd()

export interface AppCreatorContext {
  theme: Theme
  region: string
  language: string
  userAgent: string
  layout?: LayoutColumn
  error?: RenderErrorValue
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
    language: context.language || '',
    layout: context.layout ?? LayoutColumn.Normal,
    error: context.error
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
    keys: Object.values(LanguageKey),
    languages
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
  app.config.errorHandler = (error) => globalState.setRenderError(error)
  // handle router error: https://router.vuejs.org/api/interfaces/Router.html#onError-
  router.onError((error) => globalState.setRenderError(error))

  // handle router validate error & 404 error
  // https://next.router.vuejs.org/guide/advanced/navigation-guards.html#optional-third-argument-next
  router.beforeEach((to, _, next) => {
    if (to.meta.validator) {
      to.meta
        .validator({ route: to, i18n, store })
        .then(next)
        .catch((error) => {
          // next(error) > router error > global state error
          const newError: any = new Error()
          newError.code = error.code
          newError.message = error.message
          next(newError)
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
