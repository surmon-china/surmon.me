const app  =  require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { Nuxt, Builder } = require('nuxt')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
process.noDeprecation = true

app.set('port', port)

// Import and Set Nuxt.js options
const config = require('./nuxt.config.js')
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

// Socket.io
const messages = []
io.on('connection', socket => {
	console.log('new socket.io user!')
  socket.on('last-message', callback => {
    callback(messages.slice(-50))
  })
  socket.on('send-message', message => {
    messages.push(message)
    socket.broadcast.emit('new-message', message)
  })
})
