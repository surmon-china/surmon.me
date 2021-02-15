import path from 'path'
import deepmerge from 'deepmerge'
import { BuildMode } from './interface'
import { buildApp, getOutDir } from './bundle'
import getClientConfig from './config/client'
import getServerConfig from './config/server'

const {
  client: clientOutDir,
  server: serverOutDir
} = getOutDir(path.join(__dirname, '..', 'dist'))

;(async () => {
  buildApp({
    clientConfig: deepmerge(await getClientConfig(BuildMode.Production), {
      build: {
        outDir: clientOutDir
      }
    }),
    serverConfig: deepmerge(await getServerConfig(BuildMode.Production), {
      build: {
        outDir: serverOutDir
      }
    })
  })
})()
