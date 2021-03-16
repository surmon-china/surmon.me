/**
 * @file vuniversal config
 * @module config/vuniversal
 * @author Surmon <surmon@foxmail.com>
 */

import { mergeConfig, UserConfigFn } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { VuniversalConfig } from './vuniversal/interface'
import resolveViteConfig from './vite.config'

export default {
  clientEntry: './src/client.ts',
  serverEntry: './src/server.ts',
  async vite(target, mode) {
    const viteConfig = await (resolveViteConfig as UserConfigFn)({
      command: 'build',
      mode
    })

    // TODO: shouldPreload!

    if (target === 'client') {
      return mergeConfig(viteConfig, {
        define: {
          VITE_SSR: 'true',
        },
      })
    }

    if (target === 'server') {
      return mergeConfig(viteConfig, {
        define: {
          VITE_SSR: 'true',
        },
        build: {
          rollupOptions: {
            // MARK: IMPORTANT! FOR Node.js bound
            external: viteConfig?.optimizeDeps?.include || []
          }
        },
        plugins: [vuePlugin({
          template: {
            compilerOptions: {
              directiveTransforms: {
                swiper(prop, node, context) {
                  return { props: [] }
                }
              }
            }
          }
        })]
      })
    }
  }
} as VuniversalConfig
