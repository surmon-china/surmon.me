const fs = require('fs')
const path = require('path')
const express = require('express')

const root = process.cwd()
const isProd = process.env.NODE_ENV === 'production'
const resolveRoot = (path) => path.resolve(__dirname, path)
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

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

