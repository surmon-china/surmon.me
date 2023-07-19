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
        input: path.join(paths.root, 'src', 'ssr'),
        output: {
          inlineDynamicImports: false,
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js'
        }
      }
    }
  })
}
