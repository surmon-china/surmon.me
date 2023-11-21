/**
 * @file Server render entry
 * @module SSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

import serialize from 'serialize-javascript'
import isObject from 'lodash-es/isObject'
import type { Request } from 'express'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { renderSSRHead, SSRHeadPayload } from '@unhead/ssr'
import { createMainApp, MainApp } from '/@/app/main'
import type { SSRContext } from '/@/app/context'
import type { RenderErrorValue } from '/@/app/state'
import { renderSSRStateScript, renderSSRContextScript } from '/@/universal'
import { Theme, THEME_STORAGE_KEY } from '/@/composables/theme'
import { SUCCESS, INVALID_ERROR } from './constants/http-code'
import { CDNPrefix, getCDNPrefixURL } from '/@/transforms/url'
import { isCNCode } from '/@/transforms/region'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import type { CacheClient } from '@/server/services/cache'
import { createLogger } from '/@/utils/logger'
import { isDev } from '/@/app/environment'
import API_CONFIG from '/@/config/api.config'

const renderLogger = createLogger('SSR:Render')
const devDebug = (...messages: any[]) => isDev && renderLogger.debug(...messages)

const createSSRContext = (request: Request, error?: RenderErrorValue): SSRContext => {
  const { headers, cookies, originalUrl } = request
  const country = headers['country-code'] as string
  const cdnDomain = isCNCode(country) ? API_CONFIG.CDN_CHINA : API_CONFIG.CDN_GLOBAL
  const assetsPrefix = getCDNPrefixURL(cdnDomain, CDNPrefix.Assets)
  return {
    requestURL: originalUrl,
    country,
    language: headers['accept-language'],
    userAgent: headers['user-agent'],
    cookieTheme: cookies[THEME_STORAGE_KEY],
    cdnDomain,
    assetsPrefix,
    error
  }
}

const getRegionByCode = (code?: string) => {
  return code && isCNCode(code) ? 'cn' : 'global'
}

const getCacheKey = (vueApp: MainApp, ssrContext: SSRContext): string => {
  const { i18n, theme, globalState } = vueApp
  const language = i18n.language.value
  const themeValue = theme.theme.value
  const device = globalState.userAgent.isMobile ? 'mobile' : 'desktop'
  const region = getRegionByCode(ssrContext.country)
  return `ssr:${language}_${region}_${device}_${themeValue}_${ssrContext.requestURL}`
}

// app creater
const createApp = (ssrContext: SSRContext): MainApp => {
  const mainApp = createMainApp({
    historyCreator: createMemoryHistory,
    language: ssrContext.language!,
    userAgent: ssrContext.userAgent!,
    theme: (ssrContext.cookieTheme as Theme) || Theme.Light,
    region: getRegionByCode(ssrContext.country),
    error: ssrContext.error
  })
  // set ssr context to app global
  // mainApp.app.config.globalProperties.$ssrContext = ssrContext
  // HACK: hack components and directives for SSR fix warn
  // https://github.com/vuejs/core/blob/main/CHANGELOG.md#features
  const hackDirectives = ['lozad']
  const hackComponents = ['progress-bar', 'popup-root', 'popup', 'Adsense']
  hackDirectives.forEach((d) => mainApp.app.directive(d, {}))
  hackComponents.forEach((c) => mainApp.app.component(c, {}))
  // init global head attributes: https://unhead.harlanzw.com/api/core/push
  // When run `head.push` on the server, it is patched immediately and does not need to be updated.
  mainApp.head.push(mainApp.getGlobalHead(), { mode: 'server' })
  return mainApp
}

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
const renderHTML = async (mainApp: MainApp, ssrContext: SSRContext): Promise<Omit<RenderResult, 'code'>> => {
  const { app, router, store, head, theme, globalState } = mainApp
  const startTime = Date.now()

  devDebug(`- 1. route.push.validate: ${ssrContext.requestURL}`)
  await router.push(ssrContext.requestURL)
  await router.isReady()

  devDebug('- 2. store.serverInit')
  await store.serverPrefetch()

  devDebug('- 3. set layout')
  // because the layout func set has by animation done
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))

  devDebug('- 4. renderToString')
  const html = await renderToString(app, ssrContext)
  // WORKAROUND: `async setup` | `onServerPrefetch` can't break `renderToString`, resulting in empty HTML, so need to re-render based on manual markup.
  if (globalState.renderError.value) {
    const newError = new Error(globalState.renderError.value.message)
    ;(newError as any).code = globalState.renderError.value.code
    throw newError
  }

  devDebug('- 5. renderSSRHead')
  const heads = await renderSSRHead(head)

  devDebug('- 6. SSR State & SSR context script')
  const stateScripts = renderSSRStateScript(
    serialize({
      store: store.state.value,
      theme: theme.theme.value,
      layout: globalState.layoutColumn.value.layout,
      region: getRegionByCode(ssrContext.country)
    })
  )
  const contextScripts = renderSSRContextScript(
    serialize({
      ...ssrContext,
      cacheStatus: 'miss'
    })
  )

  devDebug('rendered:', Date.now() - startTime, 'ms')
  return {
    html,
    heads,
    stateScripts,
    contextScripts,
    assetsPrefix: ssrContext.assetsPrefix
  }
}

export interface RenderResult {
  code: number
  html: string
  heads: SSRHeadPayload
  stateScripts: string
  contextScripts: string
  assetsPrefix: string
}

/**
 * @name error renderer
 * 1. server runtime error
 * 2. render fetch error
 * 3. router validate/404 error
 */
export const renderError = async (request: Request, error: unknown): Promise<RenderResult> => {
  const renderError: RenderErrorValue = {
    code: (error as any).code ?? INVALID_ERROR,
    message: error instanceof Error ? error.message : isObject(error) ? error['message'] : JSON.stringify(error)
  }
  const ssrContext = createSSRContext(request, renderError)
  const { app, head, theme } = createApp(ssrContext)
  head.push({ title: `Server Error: ${renderError.message || 'unknow'}` })
  return {
    code: renderError.code,
    html: await renderToString(app, ssrContext),
    heads: await renderSSRHead(head),
    assetsPrefix: ssrContext.assetsPrefix,
    contextScripts: renderSSRContextScript(serialize(ssrContext)),
    stateScripts: renderSSRStateScript(
      serialize({
        theme: theme.theme.value,
        region: getRegionByCode(ssrContext.country)
      })
    )
  }
}

// app renderer
export const renderApp = async (request: Request, cache: CacheClient): Promise<RenderResult> => {
  const ssrContext = createSSRContext(request)
  const app = createApp(ssrContext)

  // render from cache
  const cacheKey = getCacheKey(app, ssrContext)
  const isCached = await cache.has(cacheKey)
  devDebug(`cache:`, isCached, `| "${cacheKey}"`)
  if (isCached) {
    return {
      ...(await cache.get<RenderResult>(cacheKey)),
      contextScripts: renderSSRContextScript(serialize({ ...ssrContext, cacheStatus: 'hit' })),
      code: SUCCESS
    }
  }

  try {
    const rendered = await renderHTML(app, ssrContext)
    const cacheTTL = app.router.currentRoute.value.meta?.ssrCacheTTL
    if (cacheTTL !== false && typeof cacheTTL === 'number' && cacheTTL > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { contextScripts, ...rest } = rendered
      if (cacheTTL === Infinity) {
        cache.set(cacheKey, rest)
      } else {
        cache.set(cacheKey, rest, cacheTTL)
      }
    }

    return {
      ...rendered,
      code: SUCCESS
    }
  } catch (error: any) {
    return renderError(request, error)
  }
}
