import path from 'path'
import http from 'http'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createVueApp } from './main'
import { render } from '/@/vuniversal'
import { isDev } from '/@/vuniversal/env'

// const config = require('../vun.config')
const app = express()
app.disable('x-powered-by')

// static & assets
if (isDev) {
  app.use(express.static(process.env.VUN_PUBLIC_DIR as string))
  // TODO: 反代有问题，有时候会响应失败，测热更新就可以了
  app.use(createProxyMiddleware(
    (pathname, request) => (
      request.method === 'GET' && (
        pathname.startsWith(`/${process.env.VUN_ASSETS_DIR}/`) ||
        pathname.includes('hot-update')
      )
    ),
    { target: process.env.VUN_DEV_SERVER_URL, changeOrigin: true })
  )
} else {
  app.use(express.static(path.join(__dirname, '..', 'client')))
}

// render
app.use((request, response) => {
  render({
    appCreater: createVueApp,
    url: request.originalUrl,
  })
  .then(html => response.status(200).send(html))
  .catch(error => response.status(404).send(String(error)))
})

const server = http.createServer(app).listen(3000, () => {
  console.log(`App run: http://localhost:3000`)
})

if ((module as any).hot) {
  ;(module as any).hot.accept()
  ;(module as any).hot.dispose(() => server.close())
}
