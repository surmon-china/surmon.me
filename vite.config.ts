/**
 * @file vite config
 * @author Surmon <https://github.com/surmon-china>
 * @reference https://vite.dev/config/
 */

import path from 'path'
import * as sass from 'sass'
import { loadEnv, defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { Unhead } from '@unhead/vue/bundler'
import packageJSON from './package.json' with { type: 'json' }

const CWD = process.cwd()
const BASE_ENV_CONFIG = loadEnv('', CWD)

export default defineConfig(({ mode }) => {
  const TARGET_MODE_ENV_CONFIG = loadEnv(mode, CWD)

  return {
    plugins: [vuePlugin(), ...Unhead().vite()],
    root: path.resolve(import.meta.dirname),
    publicDir: 'public',
    resolve: {
      alias: {
        '/@': path.resolve(import.meta.dirname, 'src')
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(packageJSON.version)
    },
    server: {
      open: true,
      port: 3000,
      proxy: {
        [BASE_ENV_CONFIG.VITE_API_PROXY_URL]: {
          target: BASE_ENV_CONFIG.VITE_API_ONLINE_URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true
          // configure: (proxy, options) => {
          //   proxy.on('proxyReq', (proxyReq, req, res) => {
          //     proxyReq.removeHeader('Accept-Encoding')
          //   })
          // }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          importers: [new sass.NodePackageImporter()],
          // https://sass-lang.com/documentation/at-rules/use/#configuration
          additionalData: `@use '/src/styles/base/_global' as global with ($source-url: '${TARGET_MODE_ENV_CONFIG.VITE_FE_URL}');`
        }
      }
    },
    build: {
      sourcemap: true,
      manifest: true,
      rolldownOptions: {
        // disable vite warning
        // https://github.com/vitejs/vite/pull/10331
        // https://github.com/vitejs/vite/issues/10766
        external: [/^\/images\/(?:[^/]+\/)*[^/]+$/],
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
          codeSplitting: {
            groups: [
              { name: 'sentry', test: /\/node_modules\/@sentry\// },
              {
                name: 'vendor',
                test: (id) =>
                  [
                    'vue',
                    'vue-router',
                    '@unhead/vue',
                    'pinia',
                    'axios',
                    'swiper',
                    'lozad',
                    'qrcode',
                    'geojson',
                    'lodash-es',
                    'marked',
                    'marked-highlight',
                    'marked-mangle',
                    'marked-xhtml',
                    'highlight.js',
                    'html-to-image',
                    'ua-parser-js',
                    'bezier-easing',
                    '@braintree/sanitize-url'
                  ].some((name) => id.includes(`/node_modules/${name}/`))
              }
            ]
          }
        }
      }
    }
  }
})
