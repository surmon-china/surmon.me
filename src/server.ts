/**
 * @file App server entry
 * @module app/server
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import http from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import Router from 'koa-router'
import proxy from 'koa-proxies'
import koaStatic from 'koa-static'
import { Server } from 'socket.io'
import { NODE_ENV, isProd, isDev } from './environment'
import { startGTagScriptUpdater } from './server/gtag'
import { startGitHubChartUpdater } from './server/ghchart'
import { startBarrageSocket } from './server/barrage'
import { tunnelRouter } from './server/tunnel'
import { renderSSR } from './server/render'
import { viteConfig } from './server/helper'
import API_CONFIG from './config/api.config'

// @ts-expect-error
process.noDeprecation = true

// 替换 console 为更统一友好的
const { log, warn, info } = console
const color = c => isProd ?  '' : c
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  info: (...args) => info(color('\x1B[34m%s\x1B[0m'), '[info]', ...args),
  error: (...args) => info(color('\x1B[31m%s\x1B[0m'), '[error]', ...args),
  // warn: (...args) => warn(color('\x1B[33m%s\x1B[0m'), '[warn]', ...args),
  warn: (...args) => {
    const text = args[0]
    // HACK: hidden marked sanitize warning
    // marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options
    if (!(text.startsWith('marked()') && text.includes('sanitize'))) {
      warn(color('\x1B[33m%s\x1B[0m'), '[warn]', ...args)
    }
  },
})

const app = new Koa()
const router = new Router()
const server = http.createServer(app.callback())
const io: Server = require('socket.io')(server, {
  transports: ['websocket'],
  serveClient: false,
  cookie: false
})

app.use(mount('/assets', koaStatic(path.join(__dirname, 'assets'))));
app.use(koaStatic(path.join(__dirname, '..', 'public')))

// dev -> nodejs proxy
// prod -> nginx proxy
if (isDev) {
  const proxyOptions = viteConfig.proxy
  if (proxyOptions) {
    Object.keys(proxyOptions).forEach((path) => {
      const options: any = proxyOptions[path]
      app.use(proxy(
        path,
        typeof options === 'string'
          ? { target: options }
          : options
      ))
    })
  }
}

// tunnel
router.use(API_CONFIG.TUNNEL, tunnelRouter.routes())

// router middleware
app.use(router.routes())

// renderer
app.use(renderSSR)

// run
server.listen(API_CONFIG.SERVER_PORT, () => {
  console.info(`Run！in ${NODE_ENV}, listening on ${API_CONFIG.FE}, at ${new Date().toLocaleString()}`)
  // 启动扩展服务
  startGTagScriptUpdater()
  startGitHubChartUpdater()
  startBarrageSocket(io)
})
