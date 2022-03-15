/**
 * @file Server render entry
 * @module SSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

import serialize from 'serialize-javascript'
import { Request } from 'express'
import { createSSRApp, ref } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createVueApp, VueApp } from '/@/app/main'
import { INVALID_ERROR } from '/@/constants/error'
import { MetaResult } from '/@/composables/meta'
import { Theme, THEME_STORAGE_KEY } from '/@/composables/theme'
import { renderSSRContextScript, getSSRContextByApp, renderSSRSymbleScript } from '/@/universal'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import type { CacheClient } from '/@/server/cache'
import { isDev } from '/@/environment'

const devDebug = (...args) => isDev && console.debug(`-----`, ...args)

const getCacheKey = (vueApp: VueApp, url: string): string => {
  const { i18n, theme, globalState } = vueApp
  const language = i18n.language.value
  const themeValue = theme.theme.value
  const device = globalState.userAgent.isMobile ? 'mobile' : 'desktop'
  return `ssr_${language}_${device}_${themeValue}_${url}`
}

// app creater
const createApp = (request: Request): VueApp => {
  const { headers } = request
  const app = createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
    language: headers['accept-language']!,
    userAgent: headers['user-agent']!,
    theme: (request as any).cookies[THEME_STORAGE_KEY] || Theme.Light
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
  // WORKAROUND: renderToString 无法被 async setup | onServerPrefetch 中断，导致输出的 HTML 为空壳，所以需要再次根据手工标记判断是否重新渲染
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
    return {
      ...cached,
      code: SUCCESS_STATUS
    }
  }

  try {
    const rendered = await renderHTML(app, url)
    const cacheAge = app.router.currentRoute.value.meta?.ssrCacheAge
    if (cacheAge !== false && typeof cacheAge === 'number' && cacheAge > 0) {
      if (cacheAge === Infinity) {
        cache.set(cacheKey, rendered)
      } else {
        cache.set(cacheKey, rendered, cacheAge)
      }
    }
    return {
      code: SUCCESS_STATUS,
      ...rendered
    }
  } catch (error: any) {
    return renderError(request, error)
  }
}
