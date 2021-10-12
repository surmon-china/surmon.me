/**
 * @file vite config
 * @module config/vite
 * @author Surmon <surmon@foxmail.com>
 */

import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

const CWD = process.cwd()

// env
const BASE_ENV_CONFIG = loadEnv('', CWD)
const DEV_ENV_CONFIG = loadEnv('development', CWD)
const PROD_ENV_CONFIG = loadEnv('production', CWD)

// https://vitejs.dev/config/#conditional-config
export default defineConfig(({ command, mode }) => {
  const TARGET_ENV_CONFIG = loadEnv(mode, CWD)
  const IS_VITE_SERVER = command === 'serve'
  console.info('vite config', {
    command,
    mode,
    IS_VITE_SERVER,
    TARGET_ENV_CONFIG
  })

  return {
    plugins: [vuePlugin()],
    root: path.resolve(__dirname),
    base: TARGET_ENV_CONFIG.VITE_CDN_URL + '/',
    publicDir: 'public',
    resolve: {
      alias: {
        // https://github.com/vitejs/vite/issues/1363
        // https://github.com/vitejs/vite/issues/1232#issuecomment-751168784
        // https://github.com/vitejs/vite/issues/1008#issuecomment-723209837
        // https://github.com/vitejs/vite/issues/1363#issuecomment-754739657
        // https://vitejs.dev/guide/migration.html#alias-behavior-change
        '/@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      open: true,
      port: Number(BASE_ENV_CONFIG.VITE_SERVER_PORT),
      proxy: {
        [BASE_ENV_CONFIG.VITE_API_PROXY_URL]: {
          target: BASE_ENV_CONFIG.VITE_API_ONLINE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // Tunnel 服务由 BFF 提供，此处仅为兼容 SPA 开发模式，故仅在 SPA/VITE 模式生效
        [BASE_ENV_CONFIG.VITE_TUNNEL_URL]: !IS_VITE_SERVER
          ? {}
          : {
              target: PROD_ENV_CONFIG.VITE_FE_URL,
              changeOrigin: true
            },
        '/avatar': {
          target: PROD_ENV_CONFIG.VITE_GRAVATAR_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/avatar/, '')
        },
        '/proxy': {
          target: PROD_ENV_CONFIG.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ''),
          events: {
            proxyReq(request) {
              request.setHeader(
                'User-Agent',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3223.8 Safari/'
              )
              request.setHeader('Origin', 'https://surmon.me/')
              request.setHeader('Referer', 'https://surmon.me/')
            }
          }
        }
      }
    },
    css: {
      // https://vitejs.dev/config/#css-preprocessoroptions
      preprocessorOptions: {
        scss: {
          // https://github.com/vitejs/vite/issues/520
          additionalData: `
            $cdn-url: '${TARGET_ENV_CONFIG.VITE_CDN_URL}';
            $source-url: '${TARGET_ENV_CONFIG.VITE_FE_URL}';
          `
        }
      }
    },
    build: {
      assetsDir: 'assets',
      // https://vitejs.dev/config/#build-csscodesplit
      // https://vitejs.dev/guide/features.html#css-code-splitting
      cssCodeSplit: false,
      terserOptions: {
        compress: {
          keep_infinity: true
        }
      },
      rollupOptions: {
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              const expansions = [
                'swiper',
                'dom7',
                '233333',
                'lozad',
                'marked',
                'amplitude',
                'highlight.js',
                'ua-parser'
              ]
              if (expansions.some((exp) => id.includes(`/node_modules/${exp}`))) {
                return 'expansion'
              } else {
                return 'vendor'
              }
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        'swiper',
        'querystring',
        // Tree shaking
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
        'highlight.js/lib/languages/java',
        'highlight.js/lib/languages/shell',
        'highlight.js/lib/languages/nginx',
        'highlight.js/lib/languages/stylus',
        'highlight.js/lib/languages/python',
        'highlight.js/lib/languages/javascript',
        'highlight.js/lib/languages/typescript'
      ],
      exclude: [
        // Effect polyfill
        'intersection-observer',
        // Tree shaking
        'highlight.js',
        // Node
        'koa',
        'fs-extra',
        'lru-cache',
        'node-schedule',
        'koa-mount',
        'koa-static',
        'koa-router',
        'koa-proxies',
        'https-proxy-agent',
        'serialize-javascript',
        'socket.io',
        'cross-env',
        'simple-netease-cloud-music',
        'wonderful-bing-wallpaper',
        '@vue/compiler-sfc',
        '@vue/server-renderer'
      ]
    }
  }
})
