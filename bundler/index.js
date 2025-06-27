import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { bundleBFFServer } from './step-bff.js'
import { bundleClientRender } from './step-client.js'
import { bundleServerRender } from './step-server.js'

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
    // 0. empty ./dist
    await fs.emptyDir(DIST_PATH)

    // 1. BFF server
    console.log('1. BFF server bundling...\n')
    await bundleBFFServer(DIR_PATHS)
    console.info('\nBFF bundle done!\n')

    // 2. SSR client
    console.log('2. Client render bundling...\n')
    await bundleClientRender(DIR_PATHS)
    console.info('\nClient bundle done!\n')

    // 3. SSR server
    console.info('3. Server render bundling...\n')
    await bundleServerRender(DIR_PATHS)
    console.info('\nServer render bundle done!\n')

    // 4. Resolve manifest & template
    console.info('4. Resolve manifest & template...\n')
    // 4.1 move manifest to the dist root dir
    // https://vitejs.dev/guide/migration.html#manifest-files-are-now-generated-in-vite-directory-by-default
    await fs.move(path.resolve(CLIENT_PATH, '.vite', 'manifest.json'), path.resolve(DIST_PATH, 'manifest.json'))
    // 4.2 copy index.html to the dist root dir
    await fs.move(path.resolve(CLIENT_PATH, 'index.html'), path.resolve(DIST_PATH, 'template.html'))
    console.info('Resolve manifest & template done!\n')

    // done
    console.info('Everything done!')

    process.exit(0)
  } catch (error) {
    console.error('bundle ERROR!', error)
    process.exit(1)
  }
})()
