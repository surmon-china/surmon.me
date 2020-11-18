const builtinModules = require('builtin-modules')
const packageJSON = require('../../package.json')
const vunConfig = require('../../vun.config')

module.exports = async () => {
  const viteConfig = await vunConfig.vite('server', 'development')

  return {
    ...viteConfig,
    entry: vunConfig.serverEntry,
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
      inlineDynamicImports: true,
      format: 'cjs',
      exports: 'named',
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
      ...viteConfig.rollupOutputOptions,
      manualChunks: undefined
    },
    rollupPluginVueOptions: {
      target: 'node',
      ...viteConfig.rollupPluginVueOptions
    }
  }
}
