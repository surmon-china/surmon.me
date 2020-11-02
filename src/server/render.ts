import fs from 'fs'
import path from 'path'
import { Middleware } from 'koa'
import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { getSSRContentScript } from '/@/enhancer'
import { createVueApp } from '/@/main'

const SPA_INDEX_HTML = fs
  .readFileSync(path.join(__dirname, 'index.html'))
  .toString()

export const renderSSR: Middleware = async context => {
  console.log('----renderer')
  const { headers, url } = context.request
  const { app, router, store, helmet } = createVueApp({
    appCreater: createSSRApp,
    routerHistoryCreater: createMemoryHistory,
    language: headers['accept-language'],
    userAgent: headers['user-agent'],
  })

  try {
    await router.push(url)
    await router.isReady()
    await store.serverInit()
    const APP_HTML = await renderToString(app)
    const STORE_SCRIPT = store.getServerScript()
    const SSR_CONTEXT_SCRIPT = getSSRContentScript({ url })

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
    console.log('----5 set body')
    context.body = HTML;
  } catch (error) {
    console.log('渲染错误', error)
    context.body = String(error);
  }
}
