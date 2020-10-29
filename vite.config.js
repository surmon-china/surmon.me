const path = require('path')
const srcPath = path.resolve(__dirname, 'src')

module.exports = {
  universal: {
    independence: false,
    srcDir: srcPath,
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
  },
  // root: './',
  // base: '/',
  // hostname: 'surmon.me',
  // https: true,
  // port: 3001,
  assetsDir: 'assets',
  alias: {
    '/@/': srcPath
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
  vueCompilerOptions: {
    directiveTransforms: {
      i18n(prop, node, context) {
        // console.log('directiveTransforms i18n', prop, node, context)
        return { props: [] }
      },
      swiper(prop, node, context) {
        // console.log('directiveTransforms swiper', prop, node, context)
        return { props: [] }
      }
    }
  }
}
