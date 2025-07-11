import fs from 'fs'
import path from 'path'
import type { RequestContext } from '@/server/main'
import type { RequestResult } from '@/server/main/responder'
import type { CacheStore } from '@/server/services/cache'
import type { RenderResult } from '@/server-entry'
import { MIME_TYPES } from '@/constants/mime-type'
import { ROOT_PATH } from '@/configs/bff.env'
import { resolveTemplate } from './_template'

export const createDevRenderer = async (cache: CacheStore) => {
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

  const render = async (context: RequestContext) => {
    const { renderApp, renderError } = await viteServer.ssrLoadModule('/src/server-entry.ts')
    const indexHTML = fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf-8')
    const template = await viteServer.transformIndexHtml(context.url, indexHTML)

    const resolveRendered = (rendered: RenderResult): RequestResult => ({
      contentType: MIME_TYPES.html,
      status: rendered.code,
      body: resolveTemplate({
        template,
        appHTML: rendered.appHTML,
        headHTML: rendered.headHTML,
        bodyScripts: `${rendered.stateScripts}\n${rendered.contextScripts}`
      })
    })

    try {
      return resolveRendered(await renderApp(context, cache))
    } catch (error: any) {
      viteServer.ssrFixStacktrace(error)
      return resolveRendered(await renderError(context, error))
    }
  }

  return {
    viteServer,
    render
  }
}
