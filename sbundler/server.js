const path = require('path')
const { build } = require('vite')
const builtinModules = require('builtin-modules')
const packageJSON = require('../package.json')

exports.bundleSSRServer = async (paths) => {
  console.info('Server bundling...\n')
  return await build({
    publicDir: false,
    build: {
      ssr: true,
      minify: true,
      manifest: false,
      emptyOutDir: false,
      outDir: paths.server,
      rollupOptions: {
        input: path.join(paths.root, 'src', 'ssr'),
        output: {
          // manualChunks 无法覆盖 vite.config.ts 的配置，导致与 vite SSR 内置的 inlineDynamicImports:true 冲突，且 App 中无 dynamic import 的存在，故无差别
          inlineDynamicImports: false,
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          manualChunks: () => 'ssr'
        },
        external: [...builtinModules, ...Object.keys(packageJSON.devDependencies)]
      }
    }
  })
}
