import fs from 'fs'
import path from 'path'
import LRU from 'lru-cache'
import serialize from 'serialize-javascript'
import { Middleware, Context } from 'koa'
import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { Theme, THEME_STORAGE_KEY } from '/@/services/theme'
import { getSSRContextScript, getSSRStoreScript } from '/@/universal'
import { createVueApp } from '/@/main'
import { APP_PATH } from './helper'

const SPA_INDEX_HTML = fs
  .readFileSync(path.join(APP_PATH, 'index.html'))
  .toString()

const renderHTML = async (context: Context) => {
  const { headers, url } = context.request
  const { app, router, store, helmet } = createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
    language: headers['accept-language'],
    userAgent: headers['user-agent'],
    theme: context.cookies.get(THEME_STORAGE_KEY) as Theme || Theme.Default
  })

  app.config.warnHandler = (msg, vm, trace) => {
    // `trace` is the component hierarchy trace
  }

  await router.push(url)
  await router.isReady()
  await store.serverInit()
  const APP_HTML = await renderToString(app)
  const STORE_SCRIPT = getSSRStoreScript(serialize(store.state))
  const SSR_CONTEXT_SCRIPT = getSSRContextScript(serialize({ url }))

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
      `<div id="app" data-server-rendered="true">${APP_HTML}</div>`
    ).replace(
      `</body>`,
      `${FOOTER}\n</body>`
    )

  return {
    app,
    store,
    router,
    helmet,
    HTML
  }
}

const microCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 5
})

export const renderSSR: Middleware = async context => {
  const requestURL = context.request.url
  if (microCache.has(requestURL)) {
    context.body = microCache.get(requestURL)
  } else {
    try {
      const { router, HTML } = await renderHTML(context)
      const { static: isStatic } = router.currentRoute.value.meta
      context.body = HTML
      microCache.set(requestURL, HTML, isStatic && Infinity)
    } catch (error) {
      console.log('渲染错误', error)
      context.body = String(error)
    }
  }
}
