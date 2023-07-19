import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { bundleBFFServer } from './step-bff.js'
import { bundleSSRClent } from './step-client.js'
import { bundleServerRender } from './step-server-render.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageJSON = fs.readJSONSync(path.resolve(__dirname, '..', 'package.json'))

const ROOT_PATH = path.join(__dirname, '..')
const SRC_PATH = path.join(ROOT_PATH, 'src')
const DIST_PATH = path.join(ROOT_PATH, 'dist')
const CLIENT_PATH = path.join(DIST_PATH, 'client')
const SERVER_PATH = path.join(DIST_PATH, 'server')
const DIR_PATHS = {
  src: SRC_PATH,
  root: ROOT_PATH,
  dist: DIST_PATH,
  client: CLIENT_PATH,
  server: SERVER_PATH,
  packageJSON
}

;(async () => {
  try {
    // 1. empty ./dist
    await fs.emptyDir(DIST_PATH)

    // 2. BFF server
    console.log('1. BFF server bundling...\n')
    await bundleBFFServer(DIR_PATHS)
    console.info('\nBFF bundle done!\n')

    // 3. SSR client
    console.log('2. Client render bundling...\n')
    await bundleSSRClent(DIR_PATHS)
    // rename
    await fs.rename(path.resolve(DIR_PATHS.client, 'index.html'), path.resolve(DIR_PATHS.client, 'template.html'))
    // and move to the dist root dir
    await fs.move(path.resolve(DIR_PATHS.client, 'template.html'), path.resolve(DIR_PATHS.dist, 'template.html'))
    console.info('\nClient bundle done!\n')

    // 4. SSR server
    console.info('3. Server render bundling...\n')
    await bundleServerRender(DIR_PATHS)
    console.info('\nServer render bundle done!\n')

    // done
    console.info('Everything done!')

    process.exit(0)
  } catch (error) {
    console.error('bundle ERROR!', error)
    process.exit(1)
  }
})()
