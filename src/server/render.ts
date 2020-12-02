/**
 * @file BFF Server render
 * @module server/render
 * @author Surmon <https://github.com/surmon-china>
 */

import fs from 'fs'
import path from 'path'
import LRU from 'lru-cache'
import serialize from 'serialize-javascript'
import { createSSRApp } from 'vue'
import { Middleware, Context } from 'koa'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { getLayoutByRouteMeta } from '/@/services/layout'
import { Theme, THEME_STORAGE_KEY } from '/@/services/theme'
import { getSSRContextScript, getSSRStoreScript, SSRContext } from '/@/universal'
import { createVueApp, VueApp } from '/@/main'
import { APP_PATH } from './helper'

const SPA_INDEX_HTML = fs
  .readFileSync(path.join(APP_PATH, 'index.html'))
  .toString()

const createApp = (context: Context): VueApp => {
  const { headers } = context.request
  return createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
    language: headers['accept-language'],
    userAgent: headers['user-agent'],
    theme: context.cookies.get(THEME_STORAGE_KEY) as Theme || Theme.Default
  })
}

const getCacheKey = (vueApp: VueApp, url: string): string => {
  const { i18n, theme, globalState } = vueApp
  const language = i18n.language.value
  const themeV = theme.theme.value
  const device = globalState.userAgent.isMobile ? 'mobile' : 'pc'
  return `${url}-${language}-${themeV}-${device}`
}

const renderHTML = async (vueApp: VueApp, url: string) => {
  const { app, router, store, helmet, theme, globalState } = vueApp

  await router.push(url)
  await router.isReady()
  await store.serverInit()

  // init server layout
  globalState.layoutColumn.setValue(
    getLayoutByRouteMeta(router.currentRoute.value.meta)
  )

  const ssrContextState: SSRContext = {
    url,
    theme: theme.theme.value,
    globalState: globalState.toRawState()
  }

  const APP_HTML = await renderToString(app)
  const STORE_SCRIPT = getSSRStoreScript(serialize(store.state))
  const SSR_CONTEXT_SCRIPT = getSSRContextScript(serialize(ssrContextState))

  const HEAD = [
    helmet.html.value.title,
    helmet.html.value.keywords,
    helmet.html.value.description
  ].join('\n')

  const FOOTER = [
    `<script>${STORE_SCRIPT}</script>`,
    `<script>${SSR_CONTEXT_SCRIPT}</script>`
  ].join('\n')

  const HTML = SPA_INDEX_HTML
    .replace(/<title>[\s\S]*<\/title>/, '')
    .replace(
      `<head>`,
      `<head>\n${HEAD}`
    )
    .replace(
      `<div id="app">`,
      `<div id="app" data-server-rendered="true">${APP_HTML}`
    ).replace(
      `</body>`,
      `${FOOTER}\n</body>`
    )

  return {
    html: HTML,
    isStatic: !!router.currentRoute.value.meta?.static
  }
}

const microCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 5
})

export const renderSSR: Middleware = async context => {
  const { url } = context.request
  const app = createApp(context)
  const cacheKey = getCacheKey(app, url)
  if (microCache.has(cacheKey)) {
    context.body = microCache.get(cacheKey)
  } else {
    try {
      const { html, isStatic } = await renderHTML(app, url)
      context.body = html
      microCache.set(cacheKey, html, isStatic ? Infinity : undefined)
    } catch (error) {
      console.log('渲染错误', error)
      context.body = String(error)
    }
  }
}
