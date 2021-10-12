import { UserConfig, mergeConfig } from 'vite'
import { BuildMode, BuildTarget } from '../interface'
import vunConfig from '../../vun.config'

export default async (mode: BuildMode): Promise<UserConfig> => {
  const IS_PROD = mode === 'production'
  const viteConfig = await vunConfig.vite(BuildTarget.Client, mode)

  // https://vitejs.dev/guide/migration.html#migration-from-v1
  return mergeConfig(viteConfig, {
    mode,
    logLevel: IS_PROD ? 'info' : 'silent',
    build: {
      manifest: true,
      write: true,
      sourcemap: IS_PROD ? true : 'inline',
      minify: IS_PROD ? 'terser' : false,
      rollupOptions: {
        // MARK: 'client.ts' not bound index.html
        // input: universal.clientEntry,
      }
    }
  } as UserConfig)
}
