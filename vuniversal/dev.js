const path = require('path')
const nodemon= require('nodemon')
const chokidar = require('chokidar')
const vunConfig = require('../../vun.config')
const { buildApp, getOutDir } = require('./bundle')

let nodemoner = null

const {
  client: clientOutDir,
  server: serverOutDir
} = getOutDir(path.join(__dirname, '..', '.vun'))

const startDevBuild = async () => {
  const [serverResult, clientResult] = await buildApp({
    clientConfig: {
      ...(await require('./config/client')('development')),
      outDir: clientOutDir
    },
    serverConfig: {
      ...(await require('./config/server')('development')),
      outDir: serverOutDir
    }
  })
  const distServerFile = path.join(
    serverOutDir,
    serverResult[0].assets[0].fileName
  )
  console.info('[Server] 🔵 running...')
  if (nodemoner) {
    nodemoner.restart()
  } else {
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

const watcher = chokidar.watch(path.join(__dirname, '..', '..', 'src'), {
  ignored: [/node_modules/, /\.git/],
  awaitWriteFinish: {
    stabilityThreshold: 888,
    pollInterval: 10,
    ...vunConfig.watchOptions?.awaitWriteFinish
  },
  ...vunConfig.watchOptions
})

watcher.on('change', info => {
  console.log('[File changed] ⭕️ ', info)
  startDevBuild()
})

startDevBuild()
