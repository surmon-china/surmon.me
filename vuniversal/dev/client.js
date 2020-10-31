const { build } = require('vite')
const { MESSAGE_TYPE } = require('./message')
const { universal, ...viteConfig } = require('../../vite.config')

const buildClient = async () => build({
  ...viteConfig,
  entry: universal.clientEntry,
  outDir: '.vun/client',
  mode: 'development',
  silent: true,
  sourcemap: true,
  emitIndex: true,
  emitAssets: true,
  emitManifest: true,
  minify: false,
  write: true,
  env: {
    VITE_SSR: 'true',
    ...viteConfig.env
  },
  rollupOutputOptions: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'browser'
  }
})

process.on('message', async message => {
  console.log('[Client worker] ℹ️  received message from master: ' + message)
  if (message === MESSAGE_TYPE.RE_BUILD) {
    try {
      console.info('[Client worker] 🔵 building...')
      const clientResult = await buildClient()
      console.info('[Client worker] ✅ build done.')
      process.send(MESSAGE_TYPE.BUILD_DONE)
    } catch (error) {
      console.warn('[Client worker] ❌ build error!', error)
      process.send(MESSAGE_TYPE.BUILD_ERROR)
    }
  }
})
