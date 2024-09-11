import fs from 'fs'
import path from 'path'
import type { Manifest } from 'vite'
import type { Express } from 'express'
import type { CacheClient } from '../services/cache'
import { DIST_PATH, PROD_SERVER_PATH } from '../config'
import { getManifestFlatFiles, resolveAssetsPrefix } from './_manifest'
import { resolveTemplate } from './_template'
import type { RenderResult } from '@/ssr'

export const enableProdRenderer = async (app: Express, cache: CacheClient) => {
  const template = fs.readFileSync(path.resolve(DIST_PATH, 'template.html'), 'utf-8')
  const manifest = fs.readFileSync(path.resolve(DIST_PATH, 'manifest.json'), 'utf-8')
  const manifestJSON: Manifest = JSON.parse(manifest)
  const manifestFiles = getManifestFlatFiles(manifestJSON)
  // remove CSR entry
  // Bypass webpack rewrite dynamic import, it will be resolved at runtime.
  // https://github.com/vercel/ncc/issues/935#issuecomment-1189850042
  const _import = new Function('p', 'return import(p)')
  const { renderApp, renderError } = await _import(path.resolve(PROD_SERVER_PATH, 'ssr.js'))
  // const { renderApp, renderError } = require(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  app.use('*', async (request, response) => {
    try {
      const rendered: RenderResult = await renderApp(request, cache)
      response
        .status(rendered.code)
        .set({ 'Content-Type': 'text/html' })
        .end(
          resolveTemplate({
            template: resolveAssetsPrefix(template, manifestFiles, rendered.assetsPrefix),
            heads: rendered.heads,
            appHTML: rendered.html,
            scripts: rendered.stateScripts,
            extraScripts: rendered.contextScripts
          })
        )
    } catch (error: any) {
      const rendered: RenderResult = await renderError(request, error)
      response.status(rendered.code).end(
        resolveTemplate({
          template: resolveAssetsPrefix(template, manifestFiles, rendered.assetsPrefix),
          heads: rendered.heads,
          appHTML: rendered.html,
          scripts: rendered.stateScripts,
          extraScripts: rendered.contextScripts
        })
      )
    }
  })
}
