import path from 'path'
import fs from 'fs-extra'
import { build, InlineConfig } from 'vite'

export const getOutDir = (outDir: string) => {
  return {
    client: path.join(outDir, 'client'),
    server: outDir
  }
}

export const buildClient = async (clientConfig: InlineConfig) => {
  console.info('[Client] 🔵 building...')
  try {
    const clientResult = await build(clientConfig)
    console.info('[Client] ✅ build done.')
    return clientResult
  } catch (error) {
    console.warn('[Client] ❌ build error!', error)
    throw error
  }
}

export const buildServer = async (serverConfig: InlineConfig) => {
  console.info('[Server] 🔵 building...')
  try {
    const serverResult = await build(serverConfig)
    console.info('[Server] ✅ build done.')
    return serverResult
  } catch (error) {
    console.warn('[Server] ❌ build error!', error)
    throw error
  }
}

export interface AppBuilderProps {
  clientConfig: InlineConfig
  serverConfig: InlineConfig
}

export const buildApp = async (options: AppBuilderProps) => {
  try {
    const clientOutDir = options.clientConfig.build.outDir
    const serverOutDir = options.serverConfig.build.outDir
    const clientAssetsDir = options.clientConfig.build.assetsDir || 'assets'
    const serverResult = await buildServer(options.serverConfig)
    const clientResult = await buildClient(options.clientConfig)
    fs.moveSync(
      path.join(clientOutDir, 'index.html'),
      path.join(serverOutDir, 'index.html'),
      { overwrite: true }
    )
    fs.moveSync(
      path.join(clientOutDir, clientAssetsDir),
      path.join(serverOutDir, clientAssetsDir),
      { overwrite: true }
    )
    fs.removeSync(path.join(clientOutDir))
    return [serverResult, clientResult]
  } catch (error) {
    console.warn('[Error] ❌❌❌ build error!', error.message)
    process.exit(0)
  }
}
