/**
 * @file App 入口 / Commonjs module
 * @module server
 * @author Surmon <https://github.com/surmon-china>
 */

// modules
const http = require('http')
const consola = require('consola')
const express = require('express')
const socketio = require('socket.io')
const { Nuxt, Builder } = require('nuxt')
const { isProdMode, isDevMode, environment } = require('./environment')

// config & environment
process.noDeprecation = true

// 替换 console 为更统一友好的
const { log, warn, info } = console
const color = c => isDevMode ? c : ''
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[surmon.me]', ...args),
  info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[surmon.me]', ...args),
  error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[surmon.me]', ...args),
})

const config = require('./nuxt.config')
const port = environment.PORT || 3000
const host = isProdMode ? (environment.HOST || '127.0.0.1') : '0.0.0.0'

// server extends
const webrtcServer = require('./servers/webrtc.server')
const barrageServer = require('./servers/barrage.server')
const updateGAScript = require('./expansions/analytics/update')

// app
const app = express()
const nuxt = new Nuxt(config)
const server = new http.Server(app)
const io = socketio(server, { transports: ['websocket'] })

// app dev proxy server
if (config.dev) {
  app.get('/proxy/*', (req, res) => {
    const targetUrl = 'http://' + req.url.replace('/proxy/', '')
    require('request').get(targetUrl).pipe(res)
  })
}

// app config
app.use(nuxt.render)
app.set('port', port)

// build only in dev mode
if (config.dev) {
	const builder = new Builder(nuxt)
  builder.build().catch((error) => {
    consola.error(error)
    process.exit(1)
  })
}

// listen the server
server.listen(port, host)

// app ready
consola.ready({
  badge: true,
  message: `Nuxt.js SSR Server listening on ${host}:${port}, at ${new Date().toLocaleString()}, env: ${environment.NODE_ENV}`
})

// 更新 GA 脚本
updateGAScript()

// barrage server
barrageServer(io)

// webrtc Server
webrtcServer(io)
