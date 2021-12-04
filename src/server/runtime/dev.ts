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
    try {
      const url = request.originalUrl
      const _template = fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf-8')
      const template = await viteServer.transformIndexHtml(url, _template)
      const render = (await viteServer.ssrLoadModule('/src/ssr.ts')).render
      const redered: RenderResult = await render(request)
      const html = resolveTemplate({
        template,
        appHTML: redered.html,
        metas: redered.metas,
        scripts: redered.scripts
      })
      response.status(redered.code).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error: any) {
      console.log('------BFF 捕获到错误，这里应该渲染个页面出来')
      viteServer.ssrFixStacktrace(error)
      response.status(500).end(error.stack)
    }
  })
}
