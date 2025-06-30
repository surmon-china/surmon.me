/**
 * @file vite config
 * @author Surmon <https://github.com/surmon-china>
 * @reference https://vite.dev/config/
 */

import path from 'path'
import * as sass from 'sass'
import { loadEnv, defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import unheadPlugin from '@unhead/addons/vite'
import packageJSON from './package.json'

const CWD = process.cwd()
const BASE_ENV_CONFIG = loadEnv('', CWD)

export default defineConfig(({ mode }) => {
  const TARGET_MODE_ENV_CONFIG = loadEnv(mode, CWD)

  return {
    plugins: [vuePlugin(), unheadPlugin()],
    root: path.resolve(__dirname),
    publicDir: 'public',
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src')
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
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          importers: [new sass.NodePackageImporter()],
          silenceDeprecations: ['mixed-decls'],
          // https://sass-lang.com/documentation/at-rules/use/#configuration
          additionalData: `@use '/src/styles/base/_global' as global with ($source-url: '${TARGET_MODE_ENV_CONFIG.VITE_FE_URL}');`
        }
      }
    },
    optimizeDeps: {
      exclude: [
        // IIFE
        'intersection-observer'
      ]
    },
    build: {
      sourcemap: true,
      manifest: true,
      rollupOptions: {
        // disable vite warning
        // https://github.com/vitejs/vite/pull/10331
        // https://github.com/vitejs/vite/issues/10766
        external: [/^\/images\/(?:[^/]+\/)*[^/]+$/],
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
          manualChunks: {
            sentry: ['@sentry/vue'],
            vendor: [
              'vue',
              'vue-router',
              '@unhead/vue',
              'pinia',
              'axios',
              'qs',
              'swiper',
              'lozad',
              'qrcode',
              'geojson',
              'js-cookie',
              'lodash-es',
              'marked',
              'marked-highlight',
              'marked-mangle',
              'marked-xhtml',
              'emoji-233333',
              'highlight.js',
              'html-to-image',
              'ua-parser-js',
              'bezier-easing',
              'intersection-observer',
              '@braintree/sanitize-url'
            ]
          }
        }
      }
    }
  }
})
