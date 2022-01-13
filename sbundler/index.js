const fs = require('fs-extra')
const path = require('path')
const { bundleBFFServer } = require('./step-bff')
const { bundleSLSServer } = require('./step-serverless')
const { bundleSSRClent } = require('./step-client')
const { bundleServerRender } = require('./step-server-render')

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
  try {
    // 1. empty ./dist
    await fs.emptyDir(DIST_PATH)

    // 2. BFF server
    await bundleBFFServer(DIR_PATHS)
    console.info('\nBFF bundle done!\n')

    // 3. Serverless server
    await bundleSLSServer(DIR_PATHS)
    console.info('\nServerless bundle done!\n')

    // 4. Client
    await bundleSSRClent(DIR_PATHS)
    // rename
    await fs.rename(
      path.resolve(DIR_PATHS.client, 'index.html'),
      path.resolve(DIR_PATHS.client, 'template.html')
    )
    // and move to the dist root dir
    await fs.move(
      path.resolve(DIR_PATHS.client, 'template.html'),
      path.resolve(DIR_PATHS.dist, 'template.html')
    )
    console.info('\nClient bundle done!\n')

    // 5. SSR render
    await bundleServerRender(DIR_PATHS)
    console.info('\nServer render bundle done!\n')

    process.exit(0)
  } catch (error) {
    console.error('bundle ERROR!', error)
    process.exit(1)
  }
})()
