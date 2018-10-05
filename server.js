/**
 * @file App 入口 / Commonjs module
 * @author Surmon <surmon@foxmail.com>
 */

const http = require('http')
const consola = require('consola')
const express = require('express')
const socketio = require('socket.io')
const { Nuxt, Builder } = require('nuxt')

const app = express()
const server = new http.Server(app)
const io = socketio(server, { transports: ['websocket'] })

const isProdMode = Object.is(process.env.NODE_ENV, 'production')
const host = isProdMode ? (process.env.HOST || '127.0.0.1') : '0.0.0.0'
const port = process.env.PORT || 3000

process.noDeprecation = true

// Server extends
const webrtcServer = require('./servers/webrtc.server')
const barrageServer = require('./servers/barrage.server')
const updateGAScript = require('./utils/update-analytics')

// Init Nuxt
const config = require('./nuxt.config')
const nuxt = new Nuxt(config)

app.set('port', port)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
	const builder = new Builder(nuxt)
  builder.build().catch((error) => {
    consola.error(error)
    process.exit(1)
  })
}

// Listen the server
server.listen(port, host)

// App ready
consola.ready({
  badge: true,
  message: `Nuxt.js SSR Server listening on ${host}:${port}, at ${new Date().toLocaleString()}, env: ${process.env.NODE_ENV}`
})

// 更新 GA 脚本
updateGAScript()

// barrage server
barrageServer(io)

// webrtc Server
webrtcServer(io)
