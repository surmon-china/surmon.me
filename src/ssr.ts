/**
 * @file Server render entry
 * @module SSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

import serialize from 'serialize-javascript'
import { Request } from 'express'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { renderSSRHead, SSRHeadPayload } from '@unhead/ssr'
import { createMainApp, MainApp } from '/@/app/main'
import { INVALID_ERROR } from '/@/constants/error'
import { Theme, THEME_STORAGE_KEY } from '/@/composables/theme'
import { renderSSRContextScript, getSSRContextByApp } from '/@/universal'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import type { CacheClient } from '/@/server/cache'
import { isDev } from '/@/app/environment'

const devDebug = (...args) => isDev && console.debug('-', ...args)

const getCacheKey = (vueApp: MainApp, url: string): string => {
  const { i18n, theme, globalState } = vueApp
  const language = i18n.language.value
  const themeValue = theme.theme.value
  const device = globalState.userAgent.isMobile ? 'mobile' : 'desktop'
  return `ssr_${language}_${device}_${themeValue}_${url}`
}

// app creater
const createApp = (request: Request): MainApp => {
  const { headers } = request
  const mainApp = createMainApp({
    historyCreator: createMemoryHistory,
    language: headers['accept-language']!,
    userAgent: headers['user-agent']!,
    theme: request.cookies[THEME_STORAGE_KEY] || Theme.Light
  })
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

const renderScripts = (data: any) => {
  // ...
  const ssrContextScript = renderSSRContextScript(serialize(data))
  return [/** ... */ ssrContextScript].join('\n')
}

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
const renderHTML = async (mainApp: MainApp, url: string) => {
  devDebug(`renderHTML: ${url}`)
  const { app, router, store, head, theme, globalState } = mainApp

  devDebug('1. route.push.validate')
  await router.push(url)
  await router.isReady()

  devDebug('2. store.serverInit')
  await store.serverPrefetch()

  // because the layout func set has by animation done
  devDebug('3. set layout')
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))

  devDebug('4. renderToString')
  const ssrContext = {}
  const html = await renderToString(app, ssrContext)
  // WORKAROUND: `async setup` | `onServerPrefetch` can't break `renderToString`, resulting in empty HTML, so need to re-render based on manual markup.
  if (globalState.renderError.value) {
    const newError = new Error(globalState.renderError.value.message)
    ;(newError as any).code = globalState.renderError.value.code
    throw newError
  }

  devDebug('5. renderHeadString')
  const heads = await renderSSRHead(head)

  devDebug('6. HTML & SSR context script')
  const scripts = renderScripts({
    heads,
    url,
    layout: globalState.layoutColumn.value.layout,
    theme: theme.theme.value,
    store: store.state.value,
    ...getSSRContextByApp(app)
  })

  return { html, heads, scripts }
}

export interface RenderResult {
  code: number
  html: string
  scripts: string
  heads: SSRHeadPayload
}

/**
 * @name error renderer
 * 1. server runtime error
 * 2. render fetch error
 * 3. router validate/404 error
 */
export const renderError = async (request: Request, error: Error & { code?: number }): Promise<RenderResult> => {
  const { app, head, globalState, theme } = createApp(request)
  globalState.setRenderError(error)
  head.push({ title: `Server Error: ${error?.message || String(error) || 'unknow'}` })
  return {
    code: error.code ?? INVALID_ERROR,
    html: await renderToString(app),
    heads: await renderSSRHead(head),
    scripts: renderScripts({
      theme: theme.theme.value,
      ...getSSRContextByApp(app)
    })
  }
}

// app renderer
export const renderApp = async (request: Request, cache: CacheClient): Promise<RenderResult> => {
  const app = createApp(request)
  const { originalUrl: url } = request
  const SUCCESS_STATUS = 200

  // render from cache
  const cacheKey = getCacheKey(app, url)
  const isCached = await cache.has(cacheKey)
  devDebug('cache key:', cacheKey, isCached)
  if (isCached) {
    const cached = await cache.get(cacheKey)
    return { ...cached, code: SUCCESS_STATUS }
  }

  try {
    const rendered = await renderHTML(app, url)
    const cacheTTL = app.router.currentRoute.value.meta?.ssrCacheTTL
    if (cacheTTL !== false && typeof cacheTTL === 'number' && cacheTTL > 0) {
      if (cacheTTL === Infinity) {
        cache.set(cacheKey, rendered)
      } else {
        cache.set(cacheKey, rendered, cacheTTL)
      }
    }

    return { ...rendered, code: SUCCESS_STATUS }
  } catch (error: any) {
    return renderError(request, error)
  }
}
