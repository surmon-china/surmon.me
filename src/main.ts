/**
 * @file App main
 * @module app.main
 * @author Surmon <https://github.com/surmon-china>
 */

import { CreateAppFunction } from 'vue'
import { RouterHistory } from 'vue-router'
import { META } from '/@/config/app.config'
import { RouteName } from './router'
import { createUniversalRouter } from './router'
import { createUniversalStore } from './store'
import { createI18n } from '/@/services/i18n'
import { createHelmet } from '/@/services/helmet'
import { createTheme, Theme } from '/@/services/theme'
import { getLayoutMiddleware } from '/@/services/layout'
import interior from '/@/services/interior'
import { Language, languages, langMap } from '/@/language/data'
import { createGlobalState } from './state'
import App from './app.vue'

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

  const helmet = createHelmet({
    title: `${META.title} - ${META.description}`,
    keywords: META.keywords,
    description: META.description,
    titleTemplate: (title: string) => `${title} | ${META.title}`
  })

  app.use(router)
  app.use(store)
  app.use(globalState)
  app.use(i18n)
  app.use(helmet)
  app.use(theme)
  app.use(interior)

  return {
    app,
    router,
    store,
    globalState,
    i18n,
    helmet,
    theme,
    interior
  }
}
