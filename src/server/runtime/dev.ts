import fs from 'fs'
import path from 'path'
import { Express } from 'express'
import { createServer } from 'vite'
import { RenderResult } from '@/ssr'
import { resolveTemplate } from './template'
import { ROOT_PATH } from '../helper'

export const enableDevRuntime = async (app: Express) => {
  const viteServer = await createServer({
    root: process.cwd(),
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  })

  // use vite's connect instance as middleware
  app.use(viteServer.middlewares)
  app.use('*', async (request, response) => {
    const { renderApp, renderError } = await viteServer.ssrLoadModule('/src/ssr.ts')
    let template = fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf-8')

    try {
      const url = request.originalUrl
      template = await viteServer.transformIndexHtml(url, template)
      const redered: RenderResult = await renderApp(request)
      response
        .status(redered.code)
        .set({ 'Content-Type': 'text/html' })
        .end(
          resolveTemplate({
            template,
            appHTML: redered.html,
            metas: redered.metas,
            scripts: redered.scripts
          })
        )
    } catch (error: any) {
      viteServer.ssrFixStacktrace(error)
      const redered: RenderResult = await renderError(request, error)
      response.status(redered.code).end(
        resolveTemplate({
          template,
          appHTML: redered.html,
          metas: redered.metas,
          scripts: redered.scripts
        })
      )
    }
  })
}
