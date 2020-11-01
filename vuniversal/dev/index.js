const fs = require('fs-extra')
const path = require('path')
const childProcess = require('child_process')
const nodemon= require('nodemon')
const chokidar = require('chokidar')
const { universal } = require('../../vite.config')
const { MESSAGE_TYPE, CLIENT_OUT_PATH, SERVER_OUT_PATH } = require('./constant')

const clientWorker = childProcess.fork(path.join(__dirname, 'client.js'))
const serverWorker = childProcess.fork(path.join(__dirname, 'server.js'))
const distServerFile = path.join(SERVER_OUT_PATH, 'server.js')

let nodemoner = null
let clientDone = false
let serverDone = false

const checkStart = () => {
  if (clientDone && serverDone && !nodemoner) {
    nodemoner = nodemon({
      script: distServerFile,
      watch: distServerFile
    }).on('start', () => {
      console.log('[nodemon start] ♥️ \n')
    }).on('restart', info => {
      console.log('[nodemon restart] ♥️', info)
    })
  }
}

clientWorker.on('message', ({ type, data }) => {
  if (type === MESSAGE_TYPE.BUILD_DONE) {
    clientDone = true
    fs.move(
      path.join(CLIENT_OUT_PATH, 'index.html'),
      path.join(SERVER_OUT_PATH, 'index.html'),
      { overwrite: true }
    )
    checkStart()
  } else if (type === MESSAGE_TYPE.BUILD_ERROR) {
    clientDone = false
  }
})

serverWorker.on('message', ({ type }) => {
  if (type === MESSAGE_TYPE.BUILD_DONE) {
    serverDone = true
    checkStart()
  } else if (type === MESSAGE_TYPE.BUILD_ERROR) {
    serverDone = false
  }
})

const buildApp = () => {
  clientWorker.send({ type: MESSAGE_TYPE.RE_BUILD })
  serverWorker.send({ type: MESSAGE_TYPE.RE_BUILD })
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

