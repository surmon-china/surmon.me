import path from 'path'
import builtinModules from 'builtin-modules'
import { build } from 'vite'

export const bundleBFFServer = async (paths) => {
  await build({
    // https://vite.dev/guide/api-javascript#inlineconfig
    configFile: false,
    resolve: {
      alias: {
        '@': paths.src
      }
    },
    build: {
      outDir: paths.dist,
      emptyOutDir: true,
      emitAssets: false,
      copyPublicDir: false,
      sourcemap: false,
      minify: false,
      lib: {
        entry: path.join(paths.src, 'bff.ts'),
        fileName: 'bff',
        formats: ['es']
      },
      rollupOptions: {
        external: [
          ...builtinModules,
          ...Object.keys(paths.packageJSON.dependencies),
          ...Object.keys(paths.packageJSON.devDependencies)
        ]
      }
    }
  })
}
