import path from 'path'
import { build } from 'vite'

export const bundleBFFServer = async (paths) => {
  await build({
    // Do not use `configFile` here, as it will cause Vite to look for a config file in the current working directory.
    // https://vite.dev/guide/api-javascript#inlineconfig
    configFile: false,
    // Should stay consistent with your TypeScript config (`tsconfig.json > compilerOptions.paths`)
    resolve: { alias: { '@': paths.src } },
    // Leverage Vite's native SSR capability to exclude all external dependencies from the bundle.
    // No need to manually define the `external` list.
    // https://vite.dev/config/ssr-options.html#ssr-external
    ssr: { external: true },
    build: {
      // Use SSR mode instead of lib mode to ensure Vite properly excludes external modules
      // and appends file extensions like `.js` where needed.
      // This is especially important for subpath imports.
      // e.g. `import '@dotenvx/dotenvx/config'`
      // e.g. `import foo from 'lodash-es/foo'` → `import foo from 'lodash-es/foo.js'`
      // https://vite.dev/config/build-options#build-ssr
      ssr: true,
      outDir: paths.dist,
      emptyOutDir: true,
      emitAssets: false,
      copyPublicDir: false,
      sourcemap: false,
      manifest: false,
      minify: false,
      rollupOptions: {
        input: path.join(paths.src, 'bff.ts'),
        output: {
          entryFileNames: 'bff.js'
        }
      }
    }
  })
}
