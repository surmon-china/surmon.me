const path = require('path')

// const a = "/Users/surmon/Projects/Blog/surmon.me/node_modules/vite/dist/resolver.js"
module.exports = {
  // root: './src',
  // base: './public',
  hostname: 'surmon.me',
  port: 443,
  https: true,
  // open: true,
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  optimizeDeps: {
    link: [],
    include: ['swiper', 'querystring'],
    allowNodeBuiltins: [],
    exclude: ['esm', 'fs-extra', 'socket.io', 'request', 'cross-env', '@vue/compiler-sfc', '@vue/server-renderer']
  },
  proxy: {
    '/api': {
      target: 'https://api.surmon.me',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    },
    '/proxy': {
      target: 'https://surmon.me/proxy',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/proxy/, '')
      // forward: true,
      // rewrite(path) {
      //   const proxyPath = `/proxy/bilibili/`
      //   const index = path.lastIndexOf(proxyPath)
      //   if (index > -1) {
      //     return 'http://' + path.slice(proxyPath.length + index)
      //   }
      //   return path
      // }
    }
  },
  plugins: [
    {
      /*
      transforms: [
        {
          test: (path) => {
            // console.log('-----------path', path)
            return path.endsWith('.scss') || path.includes(`.vue?type=style`)
          },
          transform: (code, _, isBuild, path) => {
            const newCode = `@import "src/assets/styles/init.scss"; ${code}`
            // console.log('-------code', newCode)
            return newCode
          }
        }
      ]
      */
      /*
      configureServer: ({
        root, // project root directory, absolute path
        app, // Koa app instance
        server, // raw http server instance
        watcher // chokidar file watcher instance
      }) => {
        app.use(async (ctx, next) => {
          // You can do pre-processing here - this will be the raw incoming requests
          // before vite touches it.
          console.info('app  pre processing: ', ctx.path, ctx.url)
            if (ctx.path.endsWith('.scss') || ctx.path.includes(`.vue?type=style`)) {
            // Note vue <style lang="xxx"> are supported by
            // default as long as the corresponding pre-processor is installed, so this
            // only applies to <link ref="stylesheet" href="*.scss"> or js imports like
            // `import '*.scss'`.
            console.log('pre processing: ', ctx.url)
            ctx.type = 'css'
            ctx.body = 'body { border: 1px solid red }'
          }
          return next()
        })
      }
      */
    }
  ]
}
