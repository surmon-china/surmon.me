/**
 * @file Server render entry
 * @module SSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'
import serialize from 'serialize-javascript'
import { Request } from 'express'
import { createSSRApp, ref } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { getLayoutByRouteMeta } from '/@/services/layout'
import { Theme, THEME_STORAGE_KEY } from '/@/services/theme'
import { MetaResult } from '/@/services/meta'
import { INVALID_ERROR } from '/@/constants/error'
import { createVueApp, VueApp } from '/@/app/main'
import { isDev } from '/@/environment'
import { renderSSRContextScript, getSSRContextByApp, renderSSRSymbleScript } from '/@/universal'

const devDebug = (...args) => isDev && console.debug(`-----`, ...args)

// cache https://github.com/isaacs/node-lru-cache
const renderCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 1 // ms > 1 minutes
})
const getCacheKey = (vueApp: VueApp, url: string): string => {
  const { i18n, theme, globalState } = vueApp
  const language = i18n.language.value
  const themeValue = theme.theme.value
  const device = globalState.userAgent.isMobile ? 'mobile' : 'desktop'
  return `${url}-${language}-${themeValue}-${device}`
}

// app creater
const createApp = (request: Request): VueApp => {
  const { headers } = request
  const app = createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
    language: headers['accept-language']!,
    userAgent: headers['user-agent']!,
    theme: (request as any).cookies[THEME_STORAGE_KEY] || Theme.Default
  })
  // HACK: hack components for SSR fix warn
  const hackComponents = ['progress-bar', 'popup-root', 'popup', 'Adsense']
  hackComponents.forEach((c) => app.app.component(c, {}))
  return app
}

const renderScripts = (data: any) => {
  const ssrSymbleScript = renderSSRSymbleScript()
  const ssrContextScript = renderSSRContextScript(serialize(data))
  return [ssrContextScript, ssrSymbleScript].join('\n')
}

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
const renderHTML = async (vueApp: VueApp, url: string) => {
  devDebug(`renderHTML: ${url}`)
  const { app, router, store, meta, theme, globalState } = vueApp

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
  // HACK: renderToString 无法被 async setup | onServerPrefetch 中断，导致输出的 HTML 为空壳，所以需要再次根据手工标记判断是否重新渲染
  if (globalState.renderError.value) {
    const newError = new Error(globalState.renderError.value.message)
    ;(newError as any).code = globalState.renderError.value.code
    throw newError
  }

  devDebug('5. renderMetaString')
  const metas = await meta.renderToString()

  devDebug('6. HTML & SSR context script')
  const scripts = renderScripts({
    metas,
    url,
    layout: globalState.layoutColumn.value.layout,
    theme: theme.theme.value,
    store: store.state.value,
    ...getSSRContextByApp(app)
  })

  return {
    html,
    metas,
    scripts
  }
}

export interface RenderResult {
  code: number
  html: string
  scripts: string
  metas: MetaResult
}

/**
 * @name error renderer
 * 1. server runtime error
 * 2. render/fetch error
 * 3. router validate/404 error
 */
export const renderError = async (request: Request, error: Error): Promise<RenderResult> => {
  const { app, meta, globalState, theme } = createApp(request)
  globalState.setRenderError(error)
  meta.addHeadObjs(ref({ title: `Server Error: ${error.message || String(error) || 'unknow'}` }))
  return {
    code: (error as any).code ?? INVALID_ERROR,
    html: await renderToString(app),
    metas: await meta.renderToString(),
    scripts: renderScripts({
      theme: theme.theme.value,
      ...getSSRContextByApp(app)
    })
  }
}

// app renderer
export const renderApp = async (request: Request): Promise<RenderResult> => {
  const app = createApp(request)
  const { originalUrl: url } = request
  const SUCCESS_STATUS = 200

  // render from cache
  const cacheKey = getCacheKey(app, url)
  const hasCache = renderCache.has(cacheKey)
  devDebug('cache key:', cacheKey, hasCache)
  if (hasCache) {
    const cache = renderCache.get(cacheKey)
    return {
      ...cache,
      code: SUCCESS_STATUS
    }
  }

  try {
    const rendered = await renderHTML(app, url)
    const cacheAge = app.router.currentRoute.value.meta?.ssrCacheAge
    if (typeof cacheAge === 'number' && cacheAge > 0) {
      renderCache.set(cacheKey, rendered, cacheAge * 1000)
    }
    return {
      code: SUCCESS_STATUS,
      ...rendered
    }
  } catch (error: any) {
    return renderError(request, error)
  }
}
