import path from 'path'
import { build } from 'vite'

export const bundleServerRender = async (paths) => {
  return await build({
    publicDir: false,
    build: {
      ssr: true,
      minify: false,
      manifest: false,
      emptyOutDir: false,
      outDir: paths.server,
      rollupOptions: {
        input: path.join(paths.src, 'server-entry'),
        output: {
          // always outputs a single file
          inlineDynamicImports: false,
          manualChunks: () => 'ssr',
          entryFileNames: 'ssr.js',
          chunkFileNames: 'ssr.js'
        }
      }
    }
  })
}
