const path = require('path')
const { buildApp, getOutDir } = require('./bundle')

const {
  client: clientOutDir,
  server: serverOutDir
} = getOutDir(path.join(__dirname, '..', 'dist'))

;(async () => {
  buildApp({
    clientConfig: {
      ...(await require('./config/client')('production')),
      outDir: clientOutDir
    },
    serverConfig: {
      ...(await require('./config/server')('production')),
      outDir: serverOutDir
    }
  })
})()
