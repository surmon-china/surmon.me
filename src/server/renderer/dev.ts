import fs from 'fs'
import path from 'path'
import { createServer } from 'vite'
import type { Express } from 'express'
import type { RenderResult } from '@/ssr'
import type { CacheClient } from '../services/cache'
import { resolveTemplate } from './_template'
import { ROOT_PATH } from '../config'

export const enableDevRenderer = async (app: Express, cache: CacheClient) => {
  // https://vitejs.dev/guide/ssr.html
  const viteServer = await createServer({
    root: process.cwd(),
    logLevel: 'info',
    appType: 'custom',
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
    const { renderApp, renderError } = await viteServer.ssrLoadModule('/src/ssr.ts')
    let template = fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf-8')

    try {
      const url = request.originalUrl
      template = await viteServer.transformIndexHtml(url, template)
      const rendered: RenderResult = await renderApp(request, cache)
      response
        .status(rendered.code)
        .set({ 'Content-Type': 'text/html' })
        .end(
          resolveTemplate({
            template,
            heads: rendered.heads,
            appHTML: rendered.html,
            scripts: rendered.stateScripts,
            extraScripts: rendered.contextScripts
          })
        )
    } catch (error: any) {
      viteServer.ssrFixStacktrace(error)
      const rendered: RenderResult = await renderError(request, error)
      response.status(rendered.code).end(
        resolveTemplate({
          template,
          heads: rendered.heads,
          appHTML: rendered.html,
          scripts: rendered.stateScripts,
          extraScripts: rendered.contextScripts
        })
      )
    }
  })
}
