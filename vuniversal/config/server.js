const builtinModules = require('builtin-modules')
const packageJSON = require('../../package.json')
const vunConfig = require('../../vun.config')

module.exports = async mode => {
  const isProd = mode === 'production'
  const viteConfig = await vunConfig.vite('server', mode)

  return {
    ...viteConfig,
    entry: vunConfig.serverEntry,
    assetsDir: '.',
    mode,
    emitAssets: false,
    emitManifest: false,
    emitIndex: false,
    ssr: true,
    silent: !isProd,
    sourcemap: isProd ? true : 'inline',
    minify: isProd ? 'terser' : false,
    env: {
      VITE_SSR: 'true',
      ...viteConfig.env
    },
    rollupInputOptions: {
      ...viteConfig.rollupInputOptions,
      // https://github.com/rollup/plugins/tree/master/packages/node-resolve#resolving-built-ins-like-fs
      // https://github.com/rollup/rollup-plugin-node-resolve/issues/146#issuecomment-490096810
      external: Array.from(new Set([
        ...builtinModules,
        ...Object.keys(packageJSON.dependencies),
        ...(viteConfig.rollupInputOptions?.external || [])
      ]))
    },
    rollupOutputOptions: {
      ...viteConfig.rollupOutputOptions,
      inlineDynamicImports: true,
      format: 'cjs',
      exports: 'named',
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
      manualChunks: undefined
    },
    rollupPluginVueOptions: {
      target: 'node',
      ...viteConfig.rollupPluginVueOptions
    }
  }
}
