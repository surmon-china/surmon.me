/**
 * @file Server render entry
 * @module SSR-entry
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'
import serialize from 'serialize-javascript'
import { Request } from 'express'
import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { getLayoutByRouteMeta } from '/@/services/layout'
import { Theme, THEME_STORAGE_KEY } from '/@/services/theme'
import { MetaResult } from '/@/services/meta'
import { INVALID_ERROR } from '/@/constants/error'
import { createVueApp, VueApp } from '/@/app/main'
import { renderSSRContextScript, getSSRContextByApp, renderSSRSymbleScript } from '/@/universal'
import { isDev } from '/@/environment'

const debug = (...args: any) => isDev && console.info(`-----debug-----`, ...args)

// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
const renderHTML = async (vueApp: VueApp, url: string) => {
  debug(`renderHTML: ${url}`)
  const { app, router, store, meta, theme, globalState } = vueApp

  debug('1. store.serverInit')
  await store.prefetch()

  debug('2. route.push.validate')
  await router.push(url)
  await router.isReady()

  // because the layout func set has by animation done
  debug('3. set layout')
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))

  debug('4. renderToString')
  const ssrContext = {}
  const html = await renderToString(app, ssrContext)

  debug('5. renderMetaString')
  const metas = await meta.renderToString()

  debug('6. HTML & SSR context script')
  const ssrSymbleScript = renderSSRSymbleScript()
  const ssrContextScript = renderSSRContextScript(
    serialize({
      metas,
      url,
      layout: globalState.layoutColumn.value.layout,
      theme: theme.theme.value,
      store: store.state.value,
      ...getSSRContextByApp(app)
    })
  )

  return {
    html,
    metas,
    scripts: [ssrContextScript, ssrSymbleScript].join('\n')
  }
}

const renderCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 1
})

const getCacheKey = (vueApp: VueApp, url: string): string => {
  const { i18n, theme, globalState } = vueApp
  const language = i18n.language.value
  const themeV = theme.theme.value
  const device = globalState.userAgent.isMobile ? 'mobile' : 'pc'
  return `${url}-${language}-${themeV}-${device}`
}

export interface RenderResult {
  code: number
  html: string
  scripts: string
  metas: MetaResult
}
export const render = async (request: Request): Promise<RenderResult> => {
  const { originalUrl: url, headers } = request
  const app = createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
    language: headers['accept-language']!,
    userAgent: headers['user-agent']!,
    theme: (request as any).cookies[THEME_STORAGE_KEY] || Theme.Default
  })

  const SUCCESS_STATUS = 200

  // cache render
  const cacheKey = getCacheKey(app, url)
  if (renderCache.has(cacheKey)) {
    return {
      code: SUCCESS_STATUS,
      ...renderCache.get(cacheKey)
    }
  }

  try {
    const result = await renderHTML(app, url)
    const isStatic = Boolean(app.router.currentRoute.value.meta?.static)
    renderCache.set(cacheKey, result, isStatic ? Infinity : undefined)
    return {
      code: SUCCESS_STATUS,
      ...result
    }
  } catch (unknownError: any) {
    // 1. render page
    // 2. render route validate error page
    // 2. render 404 error page
    // TODO: 此处应该测试，Error 是否能真的被程序捕获
    console.log('------render error', unknownError)
    const error = {
      code: INVALID_ERROR,
      message: unknownError.message
    }
    throw error
    // return {
    //   html: await renderHTML(app, url, error),
    //   status: error.code
    // }
  }
}
