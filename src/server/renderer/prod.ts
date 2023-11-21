import fs from 'fs'
import path from 'path'
import type { Manifest } from 'vite'
import { Express } from 'express'
import { DIST_PATH, PRDO_SERVER_PATH } from '../config'
import { CacheClient } from '../services/cache'
import { resolveTemplate } from './_template'
import { getManifestFlatFiles, resolveAssetsPrefix } from './_manifest'
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
            template: resolveAssetsPrefix(template, manifestFiles, redered.assetsPrefix),
            heads: redered.heads,
            appHTML: redered.html,
            scripts: redered.stateScripts,
            extraScripts: redered.contextScripts
          })
        )
    } catch (error: any) {
      const redered: RenderResult = await renderError(request, error)
      response.status(redered.code).end(
        resolveTemplate({
          template: resolveAssetsPrefix(template, manifestFiles, redered.assetsPrefix),
          heads: redered.heads,
          appHTML: redered.html,
          scripts: redered.stateScripts,
          extraScripts: redered.contextScripts
        })
      )
    }
  })
}
