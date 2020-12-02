/**
 * @file vuniversal config
 * @module config/vuniversal
 * @author Surmon <surmon@foxmail.com>
 */

const deepmerge = require('deepmerge')
const { resolveConfig } = require('vite')

module.exports = {
  clientEntry: './src/client.ts',
  serverEntry: './src/server.ts',
  prerender: {
    fallback: false,
    routes: [
      '/service',
      '/about',
      '/job',
      '/app',
    ]
  },
  async vite(target, mode) {
    const viteConfig = await resolveConfig(mode)

    if (target === 'client') {
      return deepmerge(viteConfig, {
        // ...
      })
    }

    if (target === 'server') {
      return deepmerge(viteConfig, {
        rollupInputOptions: {
          // MARK: IMPORTANT! FOR Node.js bound
          external: [...viteConfig.optimizeDeps.include]
        },
        vueCompilerOptions: {
          directiveTransforms: {
            swiper(prop, node, context) {
              return { props: [] }
            }
          }
        }
      })
    }
  }
}
