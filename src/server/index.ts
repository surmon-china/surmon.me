/**
 * @file BFF Server main
 * @module server.index
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'

export const createExpressApp = () => {
  // init app
  const app = express()
  const server = http.createServer(app)

  // middlewares
  app.use(express.json())
  app.use(cookieParser())
  app.use(compression())

  return {
    app,
    server
  }
}
