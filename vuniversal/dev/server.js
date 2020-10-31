const builtinModules = require('builtin-modules')
const { ssrBuild } = require('vite')
const packageJSON = require('../../package.json')
const { universal, ...viteConfig } = require('../../vite.config')
const { MESSAGE_TYPE } = require('./message')

const buildServer = async () => ssrBuild({
  ...viteConfig,
  entry: universal.serverEntry,
  outDir: '.vun/server',
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
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    format: 'cjs',
    exports: 'named',
    entryFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'node',
  }
})

process.on('message', async message => {
  console.log('[Server worker] ℹ️  received message from master: ' + message)
  if (message === MESSAGE_TYPE.RE_BUILD) {
    try {
      console.info('[Server worker] 🔵 building...')
      const serverResult = await buildServer()
      console.info('[Server worker] ✅ build done.')
      process.send(MESSAGE_TYPE.BUILD_DONE)
    } catch (error) {
      console.warn('[Server worker] ❌ build error!', error)
      process.send(MESSAGE_TYPE.BUILD_ERROR)
    }
  }
})
