const path = require('path')
const { build } = require('vite')
const { MESSAGE_TYPE, CLIENT_OUT_PATH } = require('./constant')
const { universal, ...viteConfig } = require('../../vite.config')

const buildClient = async () => build({
  ...viteConfig,
  ...universal.viteConfig('client'),
  entry: universal.clientEntry,
  outDir: CLIENT_OUT_PATH,
  mode: 'development',
  silent: true,
  sourcemap: true,
  emitAssets: true,
  emitManifest: true,
  emitIndex: true,
  minify: false,
  write: true,
  shouldPreload(chunk) {
    console.log('shouldPreload -> chunk:', chunk.fileName)
    return true;
  },
  env: {
    VITE_SSR: 'true',
    ...viteConfig.env
  },
  rollupOutputOptions: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
  },
  rollupPluginVueOptions: {
    target: 'browser'
  }
})

process.on('message', async ({ type }) => {
  console.log('[Client worker] ℹ️  received message from master: ' + type)
  if (type === MESSAGE_TYPE.RE_BUILD) {
    try {
      console.info('[Client worker] 🔵 building...')
      const clientResult = await buildClient()
      console.info('[Client worker] ✅ build done.')
      process.send({ type: MESSAGE_TYPE.BUILD_DONE, data: clientResult })
    } catch (error) {
      console.warn('[Client worker] ❌ build error!', error)
      process.send({ type: MESSAGE_TYPE.BUILD_ERROR, data: error })
    }
  }
})
