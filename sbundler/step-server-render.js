const path = require('path')
const { build } = require('vite')

exports.bundleServerRender = async (paths) => {
  console.info('Server render bundling...\n')
  return await build({
    publicDir: false,
    ssr: {
      // https://cn.vitejs.dev/guide/migration.html#ssr-changes
      format: 'cjs',
      // https://cn.vitejs.dev/config/#ssr-noexternal
      noExternal: ['swiper']
    },
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
        }
      }
    }
  })
}
