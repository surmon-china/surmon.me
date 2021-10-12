const fs = require('fs')
const path = require('path')
const express = require('express')

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {

  const resolveRoot = (path) => path.resolve(__dirname, path)

  if (isProd) {
    const indexProd = fs.readFileSync(resolveRoot('dist/client/index.html'), 'utf-8')
    const manifest = require('./dist/client/ssr-manifest.json')
    const app = express()
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolveRoot('dist/client'), {
        index: false
      })
    )
    app.use('*', async (req, res) => {
      try {
        const url = req.originalUrl
        const render = require('./dist/server/entry-server.js').render
        const [appHtml, preloadLinks] = await render(url, manifest)
        const html = indexProd
          .replace(`<!--preload-links-->`, preloadLinks)
          .replace(`<!--app-html-->`, appHtml)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        console.log(e.stack)
        res.status(500).end(e.stack)
      }
    })
  } else {
    const app = express()
    const vite = await require('vite').createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })

    // use vite's connect instance as middleware
    app.use(vite.middlewares)
    app.use('*', async (req, res) => {
      try {
        const url = req.originalUrl
        let template, render
        // always read fresh template in dev
        template = fs.readFileSync(resolveRoot('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
        const [appHtml, preloadLinks] = await render(url, {})
        const html = template
          .replace(`<!--preload-links-->`, preloadLinks)
          .replace(`<!--app-html-->`, appHtml)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        vite.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
      }
    })
  }
  return { app, vite }
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
)

