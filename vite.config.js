const path = require('path')

module.exports = {
  port: 3000,
  open: true,
  root: path.resolve(__dirname),
  assetsDir: 'assets',
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'https://api.surmon.me',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    },
    '/proxy': {
      target: 'https://surmon.me',
      changeOrigin: true,
    },
    '/avatar': {
      target: 'https://static.surmon.me',
      changeOrigin: true,
    }
  },
  optimizeDeps: {
    link: [],
    include: ['swiper', 'querystring'],
    allowNodeBuiltins: [],
    exclude: [
      'koa',
      'fs-extra',
      'koa-static',
      'koa-proxies',
      'https-proxy-agent',
      'socket.io',
      'request',
      'cross-env',
      '@vue/compiler-sfc',
      '@vue/server-renderer'
    ]
  },
  universal: {
    independence: false,
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
    viteConfig(target) {
      if (target === 'client') {
        return {}
      }
      if (target === 'server') {
        return {
          vueCompilerOptions: {
            directiveTransforms: {
              // TODO: remove
              i18n(prop, node, context) {
                return { props: [] }
              },
              swiper(prop, node, context) {
                return { props: [] }
              }
            }
          }
        }
      }
    }
  }
}
