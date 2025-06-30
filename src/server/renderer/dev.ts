import fs from 'fs'
import path from 'path'
import type { Express } from 'express'
import type { RenderResult } from '@/ssr'
import type { CacheStore } from '../services/cache'
import { createRequestContext } from './_context'
import { resolveTemplate } from './_template'
import { ROOT_PATH } from '@/configs/bff.env'

export const enableDevRenderer = async (app: Express, cache: CacheStore) => {
  // https://vite.dev/guide/ssr.html
  // https://vite.dev/guide/api-environment-frameworks.html
  const vite = await import('vite')
  const viteServer = await vite.createServer({
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
  app.get('*all', async (request, response) => {
    const template = await viteServer.transformIndexHtml(
      request.originalUrl,
      fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf-8')
    )

    const { renderApp, renderError } = await viteServer.ssrLoadModule('/src/ssr.ts')
    const sendRenderedResponse = (rendered: RenderResult) => {
      response.status(rendered.code)
      response.set({ 'Content-Type': 'text/html' })
      response.end(
        resolveTemplate({
          template,
          appHTML: rendered.appHTML,
          headHTML: rendered.headHTML,
          bodyScripts: `${rendered.stateScripts}\n${rendered.contextScripts}`
        })
      )
    }

    try {
      sendRenderedResponse(await renderApp(createRequestContext(request), cache))
    } catch (error: any) {
      viteServer.ssrFixStacktrace(error)
      sendRenderedResponse(await renderError(createRequestContext(request), error))
    }
  })
}
