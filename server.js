const fs = require('fs')
const app  =  require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { Nuxt, Builder } = require('nuxt')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
process.noDeprecation = true

// extend
const debounce = require('./utils/debounce.js')

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
const defaultBarrages = require('./data/barrages.default.json') || []
const messages = require('./data/barrages.json') || []
if (!messages.length) {
  messages.push(...defaultBarrages)
}

// 更新本地文件数据
const updateLocalBarragesFile = () => {
  fs.writeFile('./data/barrages.json', JSON.stringify(messages), err => {
    if (err) {
      console.log('最新聊天记录保存失败', err)
    } else {
      // console.log('最新聊天记录保存成功!')
    }
  })
}

// 30秒为一个周期，保存一次最新弹幕记录
const updateDebounce = debounce(updateLocalBarragesFile, 1000 * 30)
let socketClients = 0

io.on('connection', socket => {
  // 每次有新人加入，都更新客户端数量
  io.clients((error, clients) => {
    if (error) {
      console.log('客户端数获取失败', error)
    } else {
      socketClients = clients.length
    }
  })
  socket.on('last-messages', callback => {
    callback(messages.slice(-66))
  })
  socket.on('barrage-count', callback => {
    callback({
      users: socketClients,
      count: messages.length
    })
  })
  socket.on('send-message', message => {
    messages.push(message)
    socket.broadcast.emit('new-message', message)
    socket.broadcast.emit('update-barrage-count', {
      users: socketClients,
      count: messages.length
    })
    updateDebounce()
  })
})
