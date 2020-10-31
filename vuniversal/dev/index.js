const path = require('path')
const childProcess = require('child_process')
const nodemon= require('nodemon')
const chokidar = require('chokidar')
const { universal } = require('../../vite.config')
const { MESSAGE_TYPE } = require('./message')

const clientWorker = childProcess.fork(path.join(__dirname, 'client.js'))
const serverWorker = childProcess.fork(path.join(__dirname, 'server.js'))

let nodemoner = null
let clientDone = false
let serverDone = false

const checkStart = () => {
  if (clientDone && serverDone && !nodemoner) {
    const serverFile = path.join(__dirname, '..', '..', '.vun', 'server', 'server.js')
    nodemoner = nodemon({
      script: serverFile,
      watch: serverFile
    }).on('start', () => {
      console.log('[nodemon start] ♥️ \n')
    }).on('restart', info => {
      console.log('[nodemon restart] ♥️', info)
    })
  }
}

clientWorker.on('message', message => {
  if (message === MESSAGE_TYPE.BUILD_DONE) {
    clientDone = true
    checkStart()
  } else if (message === MESSAGE_TYPE.BUILD_ERROR) {
    clientDone = false
  }
})

serverWorker.on('message', message => {
  if (message === MESSAGE_TYPE.BUILD_DONE) {
    serverDone = true
    checkStart()
  } else if (message === MESSAGE_TYPE.BUILD_ERROR) {
    serverDone = false
  }
})

const buildApp = () => {
  clientWorker.send(MESSAGE_TYPE.RE_BUILD)
  serverWorker.send(MESSAGE_TYPE.RE_BUILD)
}

const watcher = chokidar.watch(path.join(__dirname, '..', '..', 'src'), {
  ignored: [/node_modules/, /\.git/],
  awaitWriteFinish: {
    stabilityThreshold: 888,
    pollInterval: 10
  },
  ...universal.watchOptions
})

watcher.on('change', info => {
  console.log('[File changed] ⭕️ ', info)
  buildApp()
})

buildApp()

