import fs from 'fs'
import path from 'path'
import { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createServer, resolveConfig } from 'vite'
import { NODE_ENV } from '/@/environment'

const root = process.cwd()

export const enableDevRuntime = async (app: Express) => {
  const viteConfig = await resolveConfig({}, 'serve')
  const viteServer = await createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  })

  // dev proxy
  const proxyOptions = viteConfig.server?.proxy
  // if (proxyOptions) {
  //   Object.keys(proxyOptions).forEach((path) => {
  //     const options: any = proxyOptions[path]
  //     app.use(proxy(path, typeof options === 'string' ? { target: options } : options))
  //   })
  // }

  // use vite's connect instance as middleware
  app.use(viteServer.middlewares)
  app.use('*', async (req, res) => {
    try {
      const cssUrls = [],
        cssJsUrls = []
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
      const _template = fs.readFileSync(
        path.resolve(__dirname, '..', 'index.html'),
        'utf-8'
      )
      const template = await viteServer.transformIndexHtml(url, _template)
      const render = (await viteServer.ssrLoadModule('/src/server/render.ts')).render
      const mod = await viteServer.moduleGraph.getModuleByUrl('/src/client.js')
      console.log('------mod', mod?.importedModules)
      // cssUrls = mod.ssrTransformResult.deps.filter(d => d.endsWith(".css"))

      const { html } = await render(req)
      const appHtml = template
        // .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, html)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml)
    } catch (e) {
      viteServer.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })
}
