/**
 * @file BFF server entry
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import express from 'express'
import { Server as SocketServer } from 'socket.io'
import { NODE_ENV, isDev } from './environment'
import { startGTagScriptUpdater } from './server/gtag'
import { startGitHubChartUpdater } from './server/ghchart'
import { startBarrageSocket } from './server/barrage'
import { tunnelRouter } from './server/tunnel'
import { PUBLIC_PATH } from './server/helper'
import { enableDevRuntime } from './server/runtime/dev'
import { enableProdRuntime } from './server/runtime/prod'
import API_CONFIG from './config/api.config'

console.log('----isDev', isDev)

// @ts-expect-error
process.noDeprecation = true

// replace global console
const { log, warn, info } = console
const color = (c) => (isDev ? c : '')
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  info: (...args) => info(color('\x1B[34m%s\x1B[0m'), '[info]', ...args),
  error: (...args) => info(color('\x1B[31m%s\x1B[0m'), '[error]', ...args),
  warn: (...args) => warn(color('\x1B[33m%s\x1B[0m'), '[warn]', ...args)
})

// init app
const app = express()
const server = http.createServer(app)
const io: SocketServer = require('socket.io')(server, {
  transports: ['websocket'],
  serveClient: false,
  cookie: false
})

// static
// 由于 BFF 存在副作用资源，build 时不再 copy to assets
app.use(express.static(PUBLIC_PATH, { index: false }))

// tunnel
app.use(API_CONFIG.TUNNEL, tunnelRouter)

// app effect
isDev ? enableDevRuntime(app) : enableProdRuntime(app)

// run
server.listen(API_CONFIG.SERVER_PORT, () => {
  const infos = [
    `in ${NODE_ENV}`,
    `listening on ${API_CONFIG.FE}`,
    `at ${new Date().toLocaleString()}`
  ]
  console.info(`Run! ${infos.join(', ')}`)
  // 启动扩展服务
  startGTagScriptUpdater()
  startGitHubChartUpdater()
  startBarrageSocket(io)
})
