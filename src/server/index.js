/**
 * @file App 入口 / Commonjs module
 * @module server
 * @author Surmon <https://github.com/surmon-china>
 */

const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const requireESM = require('esm')(module)
const { Nuxt, Builder } = require('nuxt')
const { isDevMode, environment } = requireESM('../environment')

process.noDeprecation = true

// 替换 console 为更统一友好的
const { log, warn, info } = console
const color = c => isDevMode ? c : ''
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) => warn(color('\x1B[33m%s\x1B[0m'), '[warn]', ...args),
  info: (...args) => info(color('\x1B[34m%s\x1B[0m'), '[info]', ...args),
  error: (...args) => info(color('\x1B[31m%s\x1B[0m'), '[error]', ...args),
})

// Nuxt: https://github.com/nuxt/nuxt.js/blob/dev/packages/cli/src/utils/config.js#L27
const config = requireESM('../nuxt.config').default
const port = environment.PORT || 3000
const host = environment.HOST || '127.0.0.1'

// extends
const barrageServer = require('./barrage')
const updateGAScript = require('./analytics')

const app = express()
const nuxt = new Nuxt(config)
const server = new http.Server(app)
const io = socketio(server, { transports: ['websocket'] })

if (config.dev) {
  const handleProxy = path => {
    return (req, res) => {
      const targetUrl = 'http://' + req.url.replace('/proxy/' + (path ? path + '/' : ''), '')
      console.log('Dev proxy request:', targetUrl)
      require('request').get(targetUrl).pipe(res)
    }
  }
  app.get('/proxy/music/*', handleProxy('music'))
  app.get('/proxy/bilibili/*', handleProxy('bilibili'))
  app.get('/proxy/*', handleProxy())
}

app.use(nuxt.render)
app.set('port', port)

const bootstrap = () => {
  server.listen(port, host)
  const appName = config.manifest.name
  const envText = isDevMode ? '开发模式' : '生产模式'
  console.info(`${appName} ${envText}启动成功！listening on ${host}:${port}, at ${new Date().toLocaleString()}`)
  // 启动扩展服务
  updateGAScript()
  barrageServer(io)
}

if (config.dev) {
  new Builder(nuxt)
    .build()
    .then(bootstrap)
    .catch((error) => {
      console.error('开发模式启动失败：', error)
      process.exit(1)
    })
} else {
  bootstrap()
}
