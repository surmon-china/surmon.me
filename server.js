
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { Nuxt, Builder } = require('nuxt')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
process.noDeprecation = true

// extend
const webrtcServer = require('./webrtc.server')
const barrageServer = require('./barrage.server')
const updateGAScript = require('./utils/update-analytics')
app.set('port', port)

// Import and Set Nuxt.js options
const config = require('./nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
	const builder = new Builder(nuxt)
  builder.build().catch((error) => {
  	// eslint-disable-line no-console
    console.error(error)
    process.exit(1)
  })
}

// Listen the server
server.listen(port, host)

// eslint-disable-line no-console
console.log(`Nuxt.js SSR Server listening on ${host}:${port}, at ${new Date().toLocaleString()}`)

// 更新 GA 脚本
updateGAScript()

// barrage server
barrageServer(io)

// webrtc Server
webrtcServer(io)
