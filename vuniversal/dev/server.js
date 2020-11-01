const builtinModules = require('builtin-modules')
const { ssrBuild } = require('vite')
const packageJSON = require('../../package.json')
const { universal, ...viteConfig } = require('../../vite.config')
const { MESSAGE_TYPE, SERVER_OUT_PATH } = require('./constant')

const buildServer = async () => ssrBuild({
  ...viteConfig,
  ...universal.viteConfig('server'),
  entry: universal.serverEntry,
  outDir: SERVER_OUT_PATH,
  assetsDir: '.',
  mode: 'development',
  silent: true,
  sourcemap: true,
  emitAssets: false,
  emitManifest: false,
  emitIndex: false,
  minify: false,
  ssr: true,
  env: {
    VITE_SSR: 'true',
    ...viteConfig.env
  },
  rollupInputOptions: {
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve#resolving-built-ins-like-fs
    // https://github.com/rollup/rollup-plugin-node-resolve/issues/146#issuecomment-490096810
    external: universal.independence
      ? []
      : [...builtinModules, ...Object.keys(packageJSON.dependencies)]
  },
  rollupOutputOptions: {
    inlineDynamicImports: true,
    format: 'cjs',
    exports: 'named',
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'node',
  }
})

process.on('message', async ({ type }) => {
  console.log('[Server worker] ℹ️  received message from master: ' + type)
  if (type === MESSAGE_TYPE.RE_BUILD) {
    try {
      console.info('[Server worker] 🔵 building...')
      const serverResult = await buildServer()
      console.info('[Server worker] ✅ build done.')
      process.send({ type: MESSAGE_TYPE.BUILD_DONE, data: serverResult })
    } catch (error) {
      console.warn('[Server worker] ❌ build error!', error)
      process.send({ type: MESSAGE_TYPE.BUILD_ERROR, data: error })
    }
  }
})
