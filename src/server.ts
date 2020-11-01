import path from 'path'
import http from 'http'
import Koa from 'koa'
import proxy from 'koa-proxies'
import koaStatic from 'koa-static'
import socket from 'socket.io'
import { NODE_ENV, isProd, isDev } from './enverionment'
import { startGTagScriptUpdater } from './server/gtag'
import { startBarrageSocket } from './server/barrage'
import { renderSSR } from './server/render'
import API_CONFIG from './config/api.config'
import viteConfig from '../vite.config'

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

const PORT = viteConfig.port || 3000
const koa = new Koa()
const server = http.createServer(koa.callback())
const io = socket(server, { transports: ['websocket'] })

koa.use(koaStatic(path.join(__dirname, 'client')))

// dev -> nodejs proxy
// prod -> nginx proxy
if (isDev) {
  const proxyOptions = viteConfig.proxy
  if (proxyOptions) {
    Object.keys(proxyOptions).forEach((path) => {
      const options: any = proxyOptions[path]
      koa.use(proxy(
        path,
        typeof options === 'string'
          ? { target: options }
          : options
      ))
    })
  }
}

// renderer
koa.use(renderSSR)

// run
server.listen(PORT, () => {
  console.info(`Run！in ${NODE_ENV}, listening on ${API_CONFIG.FE}, at ${new Date().toLocaleString()}`)
  // 启动扩展服务
  startGTagScriptUpdater()
  startBarrageSocket(io)
})
