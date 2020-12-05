/**
 * @file vite config
 * @module config/vite
 * @author Surmon <surmon@foxmail.com>
 */

const path = require('path')
const { loadEnv } = require('vite')
const CWD = process.cwd()

// env
const BASE_ENV_CONFIG = loadEnv('', CWD)
const DEV_ENV_CONFIG = loadEnv('development', CWD)
const PROD_ENV_CONFIG = loadEnv('production', CWD)

module.exports = mode => {
  const TARGET_ENV_CONFIG = loadEnv(mode, CWD)

  return {
    port: 3000,
    open: true,
    base: TARGET_ENV_CONFIG.VITE_CDN_URL + '/',
    root: path.resolve(__dirname),
    assetsDir: 'assets',
    alias: {
      '/@/': path.resolve(__dirname, 'src'),
      // [socket.io-client] lib const syntax issue
      'socket.io-client': 'socket.io-client/dist/socket.io.min'
    },
    proxy: {
      '/api': {
        target: BASE_ENV_CONFIG.VITE_API_ONLINE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/proxy': {
        target: PROD_ENV_CONFIG.VITE_PROXY_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy/, '')
      },
      '/avatar': {
        target: PROD_ENV_CONFIG.VITE_GRAVATAR_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/avatar/, '')
      }
    },
    cssPreprocessOptions: {
      scss: {
        // https://github.com/vitejs/vite/issues/520
        additionalData: `
          $cdn-url: '${TARGET_ENV_CONFIG.VITE_CDN_URL}';
          $source-url: '${TARGET_ENV_CONFIG.VITE_FE_URL}';
        `,
      }
    },
    optimizeDeps: {
      link: [],
      include: [
        'swiper',
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
      allowNodeBuiltins: ['querystring'],
      exclude: [
        'highlight.js',
        'koa',
        'fs-extra',
        'lru-cache',
        'koa-mount',
        'koa-static',
        'koa-proxies',
        'https-proxy-agent',
        'serialize-javascript',
        'socket.io',
        'cross-env',
        '@vue/compiler-sfc',
        '@vue/server-renderer'
      ]
    },
    terserOptions: {
      compress: {
        keep_infinity: true
      }
    },
    rollupOutputOptions: {
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
      assetFileNames: '[name].[ext]',
      manualChunks(id) {
        if (id.includes('/node_modules/')) {
          const expansions = ['swiper', 'dom7', '233333', 'lozad', 'marked', 'amplitude', 'highlight.js', 'ua-parser']
          if (expansions.some(exp => id.includes(`/node_modules/${exp}`))) {
            return 'expansion'
          } else {
            return 'vendor'
          }
        }
      }
    },
    shouldPreload(chunk) {
      return true
    }
  }
}
