/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import { NODE_ENV, isDev } from './environment'
import { startGTagScriptUpdater } from './server/gtag'
import { startGitHubChartUpdater } from './server/ghchart'
import { tunnelRouter } from './server/tunnel'
import { PUBLIC_PATH } from './server/helper'
import { enableDevRuntime } from './server/runtime/dev'
import { enableProdRuntime } from './server/runtime/prod'
import { API_TUNNEL_PREFIX, BFF_SERVER_PORT } from './config/bff.config'

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

// cookie
app.use(cookieParser())

// static > MARK: 由于 BFF 存在副作用资源（如 gatg.js），build 时不再 copy to assets
app.use(express.static(PUBLIC_PATH, { index: false }))

// tunnel
app.use(API_TUNNEL_PREFIX, tunnelRouter)

// app effect
isDev ? enableDevRuntime(app) : enableProdRuntime(app)

// run
server.listen(BFF_SERVER_PORT, () => {
  const infos = [
    `in ${NODE_ENV}`,
    `at ${new Date().toLocaleString()}`,
    `listening on ${JSON.stringify(server.address())}`
  ]
  console.info(`Run! ${infos.join(', ')}.`)
  // 启动扩展服务
  startGTagScriptUpdater()
  startGitHubChartUpdater()
})
