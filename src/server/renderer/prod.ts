import fs from 'fs'
import path from 'path'
import { Express } from 'express'
import { DIST_PATH, PRDO_SERVER_PATH } from '../helpers/configurer'
import { CacheClient } from '../cache'
import { resolveTemplate } from './template'
import type { RenderResult } from '@/ssr'

export const enableProdRenderer = async (app: Express, cache: CacheClient) => {
  const template = fs.readFileSync(path.resolve(DIST_PATH, 'template.html'), 'utf-8')
  // Bypass webpack rewrite dynamic import, it will be resolved at runtime.
  // https://github.com/vercel/ncc/issues/935#issuecomment-1189850042
  const _import = new Function('p', 'return import(p)')
  const { renderApp, renderError } = await _import(path.resolve(PRDO_SERVER_PATH, 'ssr.js'))
  // const { renderApp, renderError } = require(path.resolve(PRDO_SERVER_PATH, 'ssr.js'))

  app.use('*', async (request, response) => {
    try {
      const redered: RenderResult = await renderApp(request, cache)
      response
        .status(redered.code)
        .set({ 'Content-Type': 'text/html' })
        .end(
          resolveTemplate({
            template,
            appHTML: redered.html,
            heads: redered.heads,
            scripts: redered.scripts
          })
        )
    } catch (error: any) {
      const redered: RenderResult = await renderError(request, error)
      response.status(redered.code).end(
        resolveTemplate({
          template,
          appHTML: redered.html,
          heads: redered.heads,
          scripts: redered.scripts
        })
      )
    }
  })
}
