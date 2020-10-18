const path = require('path')

module.exports = {
  // root: './src',
  // base: './public',
  hostname: 'surmon.me',
  port: 443,
  https: true,
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  optimizeDeps: {
    link: [],
    include: ['swiper', 'querystring'],
    allowNodeBuiltins: [],
    exclude: ['koa', 'esm', 'fs-extra', 'socket.io', 'request', 'cross-env', '@vue/compiler-sfc', '@vue/server-renderer']
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
