import fs from 'fs'
import path from 'path'
import vite from 'vite'
import express from 'express'

const root = process.cwd()
const isProd = process.env.NODE_ENV === 'production'

export const universalDevServer = async () => {
  const viteServer = await vite.createServer({
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
  app.use(viteServer.middlewares)
  app.use('*', async (req, res) => {
    try {
      // TODO: 处理 CSS
      const cssUrls = [], cssJsUrls = []
      // function collectCssUrls(mod) {
      //   mod.importedModules.forEach(submod => {
      //     if (submod.id.match(/\?vue.*&lang\.css/)) return cssJsUrls.push(submod.url)
      //     if (submod.file.endsWith(".css")) return cssUrls.push(submod.url)
      //     if (submod.file.endsWith(".vue")) return collectCssUrls(submod)
      //     // XXX need to continue recursing in your routes file
      //     if (submod.file.match(/route/)) return collectCssUrls(submod)
      //   })
      // }

      const url = req.originalUrl


      let template = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const render = (await vite.ssrLoadModule('/test/entry-server.ts')).render
      const mod = await vite.moduleGraph.getModuleByUrl('/test/entry-client.js') /* replace with your entry */
      console.log('------mod', mod?.importedModules)
      // cssUrls = mod.ssrTransformResult.deps.filter(d => d.endsWith(".css"))

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

