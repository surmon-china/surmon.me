/**
 * @file App main
 * @module app.main
 * @author Surmon <https://github.com/surmon-china>
 */

import { CreateAppFunction } from 'vue'
import { RouterHistory } from 'vue-router'
import { RouteName } from './router'
import { createUniversalRouter } from './router'
import { createUniversalStore } from './store'
import { createI18n } from '/@/services/i18n'
import { createTheme, Theme } from '/@/services/theme'
import { getLayoutMiddleware } from '/@/services/layout'
import interior from './services/interior'
import { Language, languages, langMap } from '/@/language/data'
import { createGlobalState } from './state'
import App from './app.vue'

import '/@/assets/styles/app.scss'

export interface ICreaterContext {
  appCreater: CreateAppFunction<Element>
  routerHistoryCreater(base?: string): RouterHistory
  language: string
  userAgent: string
}

export const createVueApp = (context: ICreaterContext) => {
  const globalState = createGlobalState({
    userAgent: context.userAgent || '',
    language: context.language || ''
  })

  const app = context.appCreater(App)
  const store = createUniversalStore({ globalState })
  const router = createUniversalRouter({
    beforeMiddleware: getLayoutMiddleware(globalState),
    history: context.routerHistoryCreater()
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

  app.use(router)
  app.use(store)
  app.use(globalState)
  app.use(i18n)
  app.use(theme)
  app.use(interior)

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
