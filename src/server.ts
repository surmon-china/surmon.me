import fs from 'fs'
import path from 'path'
import http  from 'http'
import Koa from 'koa'
import proxy from 'koa-proxies'
import koaStatic from 'koa-static'
import socket from 'socket.io'
import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { isProd } from './enverionment'
import { createVueApp, getSSRContentScript } from './main'
import { startGTagScriptUpdater } from './server/gtag'
import { startBarrageSocket } from './server/barrage'

// @ts-expect-error
process.noDeprecation = true

// 替换 console 为更统一友好的
const { log, warn, info } = console
const color = c => isProd ?  '' : c
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) => warn(color('\x1B[33m%s\x1B[0m'), '[warn]', ...args),
  info: (...args) => info(color('\x1B[34m%s\x1B[0m'), '[info]', ...args),
  error: (...args) => info(color('\x1B[31m%s\x1B[0m'), '[error]', ...args),
})

const PORT = 3000
const koa = new Koa()
const server = http.createServer(koa.callback())
const io = socket(server, { transports: ['websocket'] })

koa.use(koaStatic(path.join(__dirname, '..', 'client')))

// dev -> nodejs proxy
// prod -> nginx proxy
// const handleProxy = path => {
//   return (request, response) => {
//     const targetUrl = 'http://' + request.url.replace('/proxy/' + (path ? path + '/' : ''), '')
//     console.log('Dev proxy request:', targetUrl)
//     require('request').get(targetUrl).pipe(response)
//   }
// }
// server.get('/proxy/music/*', handleProxy('music'))
// server.get('/proxy/bilibili/*', handleProxy('bilibili'))
// server.get('/proxy/*', handleProxy())

koa.use(async (ctx) => {
  console.log('----renderer')
  const { headers, url } = ctx.request
  const { app, router, store } = createVueApp({
    appCreater: createSSRApp,
    routerHistoryCreater: createMemoryHistory,
    language: headers['accept-language'],
    userAgent: headers['user-agent'],
  })

  try {
    await router.push(url)
    console.log('----1')
    await router.isReady()
    console.log('----2')
    await store.serverInit()
    console.log('----3')
    const APP_HTML = await renderToString(app)
    console.log('----4')
    const STORE_SCRIPT = store.getServerScript()
    const SSR_CONTEXT_SCRIPT = getSSRContentScript({ url })
    const manifest = require(path.join(__dirname, '..', 'client', 'assets', 'manifest.json'))
    const css = fs.readFileSync(path.join(__dirname, manifest['style.css']))
    const HTML = `
      <html>
        <head>
          <script type="module">import "/vite/client"</script>
          <script type="module" src="/@/client.ts"></script>
          <style>${css}</style>
        </head>
        <body>
          <div id="app" data-server-rendered="true">${APP_HTML}</div>
          <script>
            ${STORE_SCRIPT};
            ${SSR_CONTEXT_SCRIPT};
          </script>
        </body>
      </html>
    `
    console.log('----5 set body')
    ctx.body = HTML;
  } catch (error) {
    console.log('渲染错误', error)
    ctx.body = String(error);
  }
})

server.listen(PORT, () => {
  const envText = isProd ? '生产模式' : '开发模式'
  console.info(`${envText}启动成功！listening on http://localhost:${PORT}, at ${new Date().toLocaleString()}`)
  // 启动扩展服务
  startGTagScriptUpdater()
  startBarrageSocket(io)
})
