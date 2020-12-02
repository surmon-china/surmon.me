const path = require('path')
const fs = require('fs-extra')
const { build, ssrBuild } = require('vite')

exports.getOutDir = (outDir) => {
  return {
    client: path.join(outDir, 'client'),
    server: outDir
  }
}

exports.buildClient = async (clientConfig) => {
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

exports.buildServer = async (serverConfig) => {
  console.info('[Server] 🔵 building...')
  try {
    const serverResult = await ssrBuild(serverConfig)
    console.info('[Server] ✅ build done.')
    return serverResult
  } catch (error) {
    console.warn('[Server] ❌ build error!', error)
    throw error
  }
}

exports.buildApp = async (options = {}) => {
  try {
    const clientOutDir = options.clientConfig.outDir
    const serverOutDir = options.serverConfig.outDir
    const clientAssetsDir = options.clientConfig.assetsDir || 'assets'
    const serverResult = await exports.buildServer(options.serverConfig)
    const clientResult = await exports.buildClient(options.clientConfig)
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
