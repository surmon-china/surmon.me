/**
 * @file vite config
 * @module vite-config
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
  const TARGET_ENV_CONFIG = loadEnv(mode, CWD)
  // console.info('vite config', { command, mode, TARGET_ENV_CONFIG })

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
          additionalData: `@use '/src/styles/base/_global' as global with ($source-url: '${TARGET_ENV_CONFIG.VITE_FE_URL}');`
        }
      }
    },
    optimizeDeps: {
      include: [
        'highlight.js/lib/core',
        'highlight.js/lib/languages/go',
        'highlight.js/lib/languages/css',
        'highlight.js/lib/languages/sql',
        'highlight.js/lib/languages/php',
        'highlight.js/lib/languages/xml',
        'highlight.js/lib/languages/json',
        'highlight.js/lib/languages/bash',
        'highlight.js/lib/languages/less',
        'highlight.js/lib/languages/scss',
        'highlight.js/lib/languages/yaml',
        'highlight.js/lib/languages/rust',
        'highlight.js/lib/languages/shell',
        'highlight.js/lib/languages/nginx',
        'highlight.js/lib/languages/stylus',
        'highlight.js/lib/languages/python',
        'highlight.js/lib/languages/javascript',
        'highlight.js/lib/languages/typescript'
      ],
      exclude: [
        // browser
        'intersection-observer',
        // server
        'express',
        'lru-cache',
        'cookie-parser',
        'serialize-javascript',
        'wonderful-bing-wallpaper'
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
              'pinia',
              '@unhead/vue',
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
