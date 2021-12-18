/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { NODE_ENV, isDev } from './environment'
import { startGTagScriptUpdater } from './server/gtag'
import { startGitHubChartUpdater } from './server/ghchart'
import { handleSitemapRequest, handleRSSRequest, startArchiveUpdater } from './server/archive'
import { tunnelRouter } from './server/tunnel'
import { PUBLIC_PATH } from './server/helper'
import { enableDevRuntime } from './server/runtime/dev'
import { enableProdRuntime } from './server/runtime/prod'
import { API_TUNNEL_PREFIX, BFF_SERVER_PORT } from './config/bff.config'

// @ts-expect-error
process.noDeprecation = true

// init app
const app = express()
const server = http.createServer(app)

// middlewares
app.use(cookieParser())
app.use(compression())

// static
app.use(express.static(PUBLIC_PATH))

// tunnel
app.use(API_TUNNEL_PREFIX, tunnelRouter)

// sitemap & rss
app.use('/sitemap.xml', handleSitemapRequest)
app.use('/rss.xml', handleRSSRequest)

// app effect
isDev ? enableDevRuntime(app) : enableProdRuntime(app)

// run
server.listen(BFF_SERVER_PORT, () => {
  const infos = [
    `in ${NODE_ENV}`,
    `at ${new Date().toLocaleString()}`,
    `listening on ${JSON.stringify(server.address())}`
  ]
  console.info('[surmon.me]', `Run! ${infos.join(', ')}.`)
  // run BFF services
  startGTagScriptUpdater()
  startGitHubChartUpdater()
  startArchiveUpdater()
})
