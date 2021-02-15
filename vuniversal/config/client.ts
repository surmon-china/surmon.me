import deepmerge from 'deepmerge'
import { ResolvedConfig } from 'vite'
import { BuildMode, BuildTarget } from '../interface'
import vunConfig from '../../vun.config'

export default async (mode: BuildMode): Promise<ResolvedConfig> => {
  const isProd = mode === 'production'
  const viteConfig = await vunConfig.vite(BuildTarget.Client, mode)

  // https://vitejs.dev/guide/migration.html#migration-from-v1
  return deepmerge<ResolvedConfig>(viteConfig, {
    define: {
      VITE_SSR: 'true',
    },
    logLevel: isProd ? 'info' : 'silent',
    // rollupPluginVueOptions: {
    //   target: 'browser',
    //   ...viteConfig.rollupPluginVueOptions
    // }
    // @ts-ignore
    build: {
      manifest: true,
      write: true,
      // emitAssets: true,
      // emitIndex: true,
      sourcemap: isProd ? true : 'inline',
      minify: isProd ? 'terser' : false,
      rollupOptions: {
        // MARK: 'client.ts' not bound index.html
        // input: universal.clientEntry,
      }
    }
  })
}
