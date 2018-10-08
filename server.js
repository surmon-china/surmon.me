/**
 * @file App 入口 / Commonjs module
 * @author Surmon <surmon@foxmail.com>
 */

// Modules
const http = require('http')
const consola = require('consola')
const express = require('express')
const socketio = require('socket.io')
const { Nuxt, Builder } = require('nuxt')

// Config & ENV
process.noDeprecation = true

const config = require('./nuxt.config')
const { isProdMode } = require('./environment')
const port = process.env.PORT || 3000
const host = isProdMode ? (process.env.HOST || '127.0.0.1') : '0.0.0.0'

// Server extends
const webrtcServer = require('./servers/webrtc.server')
const barrageServer = require('./servers/barrage.server')
const updateGAScript = require('./utils/update-analytics')

// App
const app = express()
const nuxt = new Nuxt(config)
const server = new http.Server(app)
const io = socketio(server, { transports: ['websocket'] })

// App dev proxy server
if (config.dev) {
  app.get('/proxy/*', (req, res) => {
    const targetUrl = 'http://' + req.url.replace('/proxy/', '')
    require('request').get(targetUrl).pipe(res)
  })
}

// App config
app.use(nuxt.render)
app.set('port', port)


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
