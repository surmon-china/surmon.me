import fs from 'fs'
import path from 'path'
import { Express } from 'express'
import { createServer } from 'vite'
import { ROOT_PATH } from '../helper'

export const enableDevRuntime = async (app: Express) => {
  const viteServer = await createServer({
    root: process.cwd(),
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  })

  // use vite's connect instance as middleware
  app.use(viteServer.middlewares)
  app.use('*', async (request, response) => {
    try {
      const url = request.originalUrl
      const _template = fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf-8')
      const template = await viteServer.transformIndexHtml(url, _template)
      const render = (await viteServer.ssrLoadModule('/src/ssr.ts')).render
      const { html } = await render(request)
      const appHtml = template.replace(`<!--app-html-->`, html)
      response.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml)
    } catch (error: any) {
      viteServer.ssrFixStacktrace(error)
      console.log(error.stack)
      response.status(500).end(error.stack)
    }
  })
}
