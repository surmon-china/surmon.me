import { ConfigEnv, UserConfig } from 'vite'
import builtinModules from 'builtin-modules'
import packageJSON from '../../package.json'
import vunConfig from '../../vun.config'

export default async (mode: ConfigEnv['mode']): Promise<UserConfig> => {
  const isProd = mode === 'production'
  const viteConfig = await vunConfig.vite('server', mode)

  // https://github.com/vitejs/vite/blob/1.x/src/node/build/index.ts#L699
  return {
    ...viteConfig,
    logLevel: isProd ? 'info' : 'silent',
    // entry: vunConfig.serverEntry,
    build: {
      assetsDir: '.',
      manifest: false,
      sourcemap: isProd ? true : 'inline',
      minify: isProd ? 'terser' : false,
      rollupOptions: {
        ...viteConfig.build?.rollupOptions,
        // https://github.com/rollup/plugins/tree/master/packages/node-resolve#resolving-built-ins-like-fs
        // https://github.com/rollup/rollup-plugin-node-resolve/issues/146#issuecomment-490096810
        external: [...new Set([
          ...builtinModules,
          ...Object.keys(packageJSON.dependencies),
          ...(viteConfig.build?.rollupOptions?.external || [])
        ])],
        output: {
          ...viteConfig.build?.rollupOptions?.output,
          inlineDynamicImports: true,
          format: 'cjs',
          exports: 'named',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          manualChunks: undefined
        }
      }
    },
    // mode,
    // emitAssets: false,
    // emitIndex: false,
    // ssr: true,
    // env: {
    //   VITE_SSR: 'true',
    //   ...viteConfig.env
    // },
    // rollupPluginVueOptions: {
    //   target: 'node',
    //   ...viteConfig.rollupPluginVueOptions
    // }
  }
}
