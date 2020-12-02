/**
 * @file App main logic
 * @module app/main
 * @author Surmon <https://github.com/surmon-china>
 */

import { CreateAppFunction } from 'vue'
import { RouterHistory } from 'vue-router'
import * as ENV from './environment'
import API_CONFIG from '/@/config/api.config'
import { META } from '/@/config/app.config'
import { RouteName } from './router'
import { createUniversalRouter, RouterCreatorConfig } from './router'
import { createUniversalStore } from './store'
import { createI18n } from '/@/services/i18n'
import { createHelmet } from '/@/services/helmet'
import { createTheme, Theme } from '/@/services/theme'
import interior from '/@/services/interior'
import { Language, languages, langMap } from '/@/language/data'
import { createGlobalState } from './state'
import App from './app.vue'

console.info('[APP INITED]', API_CONFIG, JSON.parse(JSON.stringify(ENV)))

export interface ICreatorContext {
  appCreator: CreateAppFunction<Element>
  historyCreator(base?: string): RouterHistory
  historyBeforeMiddleware?(globalState: any): RouterCreatorConfig['beforeMiddleware']
  historyAfterMiddleware?(globalState: any): RouterCreatorConfig['afterMiddleware']
  theme: Theme
  language: string
  userAgent: string
}
export type VueApp = ReturnType<typeof createVueApp>
export const createVueApp = (context: ICreatorContext) => {
  const globalState = createGlobalState({
    userAgent: context.userAgent || '',
    language: context.language || ''
  })

  const app = context.appCreator(App)
  const store = createUniversalStore({ globalState })
  const router = createUniversalRouter({
    beforeMiddleware: context.historyBeforeMiddleware?.(globalState),
    afterMiddleware: context.historyAfterMiddleware?.(globalState),
    history: context.historyCreator()
  })
  if (globalState.userAgent.isMobile) {
    router.removeRoute(RouteName.Music)
  }

  const theme = createTheme(context.theme)
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
