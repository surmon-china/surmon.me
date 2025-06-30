/**
 * @file BFF Server main
 * @module server/index
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { createCacheStore } from './services/cache'
import { PROXY_ROUTE_PATH, proxifier } from './services/proxy'
import { PUBLIC_PATH } from '@/configs/bff.env'
import { APP_META } from '@/configs/app.config'

export const createExpressApp = async () => {
  // init app
  const app = express()
  const server = http.createServer(app)

  // app middlewares
  app.use(express.json())
  app.use(cookieParser())
  app.use(compression())

  // app static
  app.use(express.static(PUBLIC_PATH))

  // app proxy
  app.get(PROXY_ROUTE_PATH, proxifier())

  // init cache service
  const cache = await createCacheStore({
    namespace: APP_META.domain.replace(/\./gi, '_')
  })

  return {
    app,
    server,
    cache
  }
}
