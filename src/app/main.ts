/**
 * @file App main logic
 * @module app.main
 * @author Surmon <https://github.com/surmon-china>
 */

import { CreateAppFunction } from 'vue'
import { RouterHistory } from 'vue-router'
import API_CONFIG from '/@/config/api.config'
import { META } from '/@/config/app.config'
import { RouteName } from './router'
import { createUniversalRouter, RouterCreatorOptions } from './router'
import { createUniversalStore } from '/@/store'
import { createI18n } from '/@/services/i18n'
import { createMeta } from '/@/services/meta'
import { createTheme, Theme } from '/@/services/theme'
import { LayoutColumn } from '/@/services/layout'
import interior from '/@/services/interior'
import { rebirthSSRContext } from '/@/universal'
import { Language, languages, langMap } from '/@/language/data'
import { createGlobalState } from './state'
import { NODE_ENV } from '/@/environment'
import { isSSR } from '/@/app/environment'
import App from './index.vue'

console.info(`[APP INITED]:`, { NODE_ENV, mode: isSSR ? 'SSR' : 'SPA' }, API_CONFIG)

export interface ICreatorContext {
  appCreator: CreateAppFunction<Element>
  historyCreator(base?: string): RouterHistory
  historyBeforeMiddleware?(globalState: any): RouterCreatorOptions['beforeMiddleware']
  historyAfterMiddleware?(globalState: any): RouterCreatorOptions['afterMiddleware']
  layout?: LayoutColumn
  theme: Theme
  language: string
  userAgent: string
}
export type VueApp = ReturnType<typeof createVueApp>
export const createVueApp = (context: ICreatorContext) => {
  const app = context.appCreator(App)
  // ssr context
  const ssrContext = rebirthSSRContext(app)

  const globalState = createGlobalState({
    userAgent: context.userAgent || '',
    language: context.language || '',
    layout: context.layout ?? LayoutColumn.Normal
  })

  const store = createUniversalStore({ globalState })
  const router = createUniversalRouter({
    beforeMiddleware: context.historyBeforeMiddleware?.(globalState),
    afterMiddleware: context.historyAfterMiddleware?.(globalState),
    history: context.historyCreator()
  })

  // keep music page PC only
  if (globalState.userAgent.isMobile) {
    router.removeRoute(RouteName.Music)
  }

  // meta
  const meta = createMeta({
    titler: (title: string) => `${title} | ${META.title}`
  })

  const theme = createTheme(context.theme)
  const i18n = createI18n({
    default: globalState.userAgent.isZhUser ? Language.Zh : Language.En,
    languages,
    map: langMap
  })

  // handle global error
  app.config.errorHandler = (error) => globalState.setRenderError(error)

  // handle router validate error & 404 error
  // https://next.router.vuejs.org/guide/advanced/navigation-guards.html#optional-third-argument-next
  router.beforeEach((to, _, next) => {
    if (to.meta.validate) {
      ;(to.meta as any)
        .validate({ route: to, i18n, store })
        .then(next)
        .catch((error) => {
          const newError: any = new Error()
          newError.code = error.code
          newError.message = error.message
          // next(error) > router error > global state error
          next(newError)
        })
    } else {
      next()
    }
  })

  app.use(router)
  app.use(store)
  app.use(globalState)
  app.use(i18n)
  app.use(meta)
  app.use(theme)
  app.use(interior)

  return {
    app,
    router,
    store,
    globalState,
    i18n,
    meta,
    theme,
    interior
  }
}
