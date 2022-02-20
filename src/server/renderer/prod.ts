import fs from 'fs'
import path from 'path'
import { Express } from 'express'
import { DIST_PATH, PRDO_SERVER_PATH } from '../helpers/configurer'
import { CacheClient } from '../cache'
import { resolveTemplate } from './template'
import type { RenderResult } from '@/ssr'

export const enableProdRenderer = async (app: Express, cache: CacheClient) => {
  const template = fs.readFileSync(path.resolve(DIST_PATH, 'template.html'), 'utf-8')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { renderApp, renderError } = require(path.resolve(PRDO_SERVER_PATH, 'ssr.js'))

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
            metas: redered.metas,
            scripts: redered.scripts
          })
        )
    } catch (error: any) {
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
