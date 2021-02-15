/**
 * @file vuniversal config
 * @module config/vuniversal
 * @author Surmon <surmon@foxmail.com>
 */

import deepmerge from 'deepmerge'
import { resolveConfig, ResolvedConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { VuniversalConfig } from './vuniversal/interface'

export default {
  clientEntry: './src/client.ts',
  serverEntry: './src/server.ts',
  async vite(target, mode) {
    const viteConfig = await resolveConfig({}, 'build', mode)

    if (target === 'client') {
      return deepmerge<ResolvedConfig>(viteConfig, {
        // ...
      })
    }

    if (target === 'server') {
      return deepmerge<ResolvedConfig>(viteConfig, {
        // @ts-ignore
        build: {
          rollupOptions: {
            // MARK: IMPORTANT! FOR Node.js bound
            external: [...viteConfig.optimizeDeps.include]
          }
        },
        // plugins: [vuePlugin({
        //   template: {
        //     compilerOptions: {
        //       directiveTransforms: {
        //         swiper(prop, node, context) {
        //           return { props: [] }
        //         }
        //       }
        //     }
        //   }
        // })]
      })
    }
  }
} as VuniversalConfig
