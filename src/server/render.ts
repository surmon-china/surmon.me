import fs from 'fs'
import path from 'path'
import { Middleware } from 'koa'
import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { Theme, THEME_STORAGE_KEY } from '/@/services/theme'
import { getSSRContextScript, getSSRStoreScript } from '/@/ssr'
import { createVueApp } from '/@/main'

const SPA_INDEX_HTML = fs
  .readFileSync(path.join(__dirname, 'index.html'))
  .toString()

export const renderSSR: Middleware = async context => {
  console.log('----renderer')
  const { headers, url } = context.request
  const { app, router, store, helmet } = createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
    language: headers['accept-language'],
    userAgent: headers['user-agent'],
    theme: context.cookies.get(THEME_STORAGE_KEY) as Theme || Theme.Default
  })

  try {
    await router.push(url)
    await router.isReady()
    await store.serverInit()
    const APP_HTML = await renderToString(app)
    const STORE_SCRIPT = getSSRStoreScript(store.state)
    const SSR_CONTEXT_SCRIPT = getSSRContextScript({ url })

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
    context.body = HTML;
  } catch (error) {
    console.log('渲染错误', error)
    context.body = String(error);
  }
}
