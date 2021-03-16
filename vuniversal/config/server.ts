import { ConfigEnv, UserConfig, mergeConfig } from 'vite'
import builtinModules from 'builtin-modules'
import { BuildMode, BuildTarget } from '../interface'
import packageJSON from '../../package.json'
import vunConfig from '../../vun.config'

export default async (mode: BuildMode): Promise<UserConfig> => {
  const IS_PROD = mode === 'production'
  const viteConfig = await vunConfig.vite(BuildTarget.Server, mode)

  // https://github.com/vitejs/vite/blob/1.x/src/node/build/index.ts#L699
  return mergeConfig(viteConfig, {
    ...viteConfig,
    mode,
    logLevel: IS_PROD ? 'info' : 'silent',
    build: {
      ssr: true,
      // TODO: test!
      ssrManifest: true,
      manifest: false,
      assetsDir: '.',
      sourcemap: IS_PROD ? true : 'inline',
      minify: IS_PROD ? 'terser' : false,
      rollupOptions: {
        input: vunConfig.serverEntry,
        output: {
          inlineDynamicImports: true,
          format: 'cjs',
          exports: 'named',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          manualChunks: undefined
        },
        // https://github.com/rollup/plugins/tree/master/packages/node-resolve#resolving-built-ins-like-fs
        // https://github.com/rollup/rollup-plugin-node-resolve/issues/146#issuecomment-490096810
        external: [...new Set([
          ...builtinModules,
          ...Object.keys(packageJSON.dependencies),
          ...(viteConfig.build?.rollupOptions?.external as [] || [])
        ])],
      }
    },
    // emitAssets: false,
    // emitIndex: false,
    // ssr: true,
    // rollupPluginVueOptions: {
    //   target: 'node',
    //   ...viteConfig.rollupPluginVueOptions
    // }
  })
}
