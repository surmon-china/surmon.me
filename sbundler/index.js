const fs = require('fs-extra')
const path = require('path')
const { bundleBFFServer } = require('./bff')
const { bundleSSRClent } = require('./client')
const { bundleSSRServer } = require('./server')

const ROOT_PATH = path.join(__dirname, '..')
const DIST_PATH = path.join(ROOT_PATH, 'dist')
const CLIENT_PATH = path.join(DIST_PATH, 'client')
const SERVER_PATH = path.join(DIST_PATH, 'server')
const DIR_PATHS = {
  root: ROOT_PATH,
  dist: DIST_PATH,
  client: CLIENT_PATH,
  server: SERVER_PATH
}

;(async () => {
  await fs.emptyDir(DIST_PATH)
  await bundleBFFServer(DIR_PATHS)
  console.info('\nBFF bundle done!\n')
  await bundleSSRClent(DIR_PATHS)
  console.info('\nClient bundle done!\n')
  await bundleSSRServer(DIR_PATHS)
  console.info('\nServer bundle done!\n')
})()
