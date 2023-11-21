/**
 * @file BFF Server main
 * @module server.index
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { createCacheClient } from './services/cache'
import { PROXY_ROUTE_PATH, proxyer } from './services/proxy'
import { PUBLIC_PATH } from './config'
import { META } from '@/config/app.config'

export const createExpressApp = async () => {
  // init app
  const app = express()
  const server = http.createServer(app)

  // app middlewares
  app.use(express.json())
  app.use(cookieParser())
  app.use(compression())

  // app proxy
  app.use(PROXY_ROUTE_PATH, proxyer())

  // app static
  app.use(express.static(PUBLIC_PATH))

  // init cache client
  const cache = await createCacheClient({
    namespace: META.domain.replace(/\./gi, '_')
  })

  return {
    app,
    server,
    cache
  }
}
