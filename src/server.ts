import * as renderer from '@vue/server-renderer'
import { createVueApp, ICreaterContext } from './main'
import { VueEnv } from '/@/vuniversal/env'
import { createServer } from 'vite'

const myPlugin = ({
  root, // project root directory, absolute path
  app, // Koa app instance
  server, // raw http server instance
  watcher // chokidar file watcher instance
}) => {
  app.use(async (ctx, next) => {
    // You can do pre-processing here - this will be the raw incoming requests
    // before vite touches it.
    if (ctx.path.endsWith('.scss')) {
      // Note vue <style lang="xxx"> are supported by
      // default as long as the corresponding pre-processor is installed, so this
      // only applies to <link ref="stylesheet" href="*.scss"> or js imports like
      // `import '*.scss'`.
      console.log('pre processing: ', ctx.url)
      ctx.type = 'css'
      ctx.body = 'body { border: 1px solid red }'
    }

    // ...wait for vite to do built-in transforms
    await next()

    // Post processing before the content is served. Note this includes parts
    // compiled from `*.vue` files, where <template> and <script> are served as
    // `application/javascript` and <style> are served as `text/css`.
    if (ctx.response.is('js')) {
      console.log('post processing: ', ctx.url)
      console.log(ctx.body) // can be string or Readable stream
    }
  })
}

createServer({
  configureServer: [myPlugin]
}).listen(3000)

// server.get('*', async (req, res) => {
  // const { app, router } = createVueApp({ target: VueEnv.Server });
  // await router.push(req.url)
  // await router.isReady().then(async () => {
  //   if (router.currentRoute.value.matched.length === 0) {
  //     res.end()
  //     return
  //   }
  //   const html = await renderer.renderToString(app)
  //   res.end(html)
  // })
// })

// console.log('started server on port 8080')
// server.listen(8080)
