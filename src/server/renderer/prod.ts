import fs from 'fs'
import path from 'path'
import type { Manifest } from 'vite'
import type { Express, Response } from 'express'
import type { CacheStore } from '../services/cache'
import { DIST_PATH, PROD_SERVER_PATH } from '../config'
import { getManifestFlatFiles, resolveAssetsPrefix } from './_manifest'
import { createRequestContext } from './_context'
import { resolveTemplate } from './_template'
import type { RenderResult } from '@/ssr'

export const enableProdRenderer = async (app: Express, cache: CacheStore) => {
  const template = fs.readFileSync(path.resolve(DIST_PATH, 'template.html'), 'utf-8')
  const manifest = fs.readFileSync(path.resolve(DIST_PATH, 'manifest.json'), 'utf-8')
  const manifestJSON: Manifest = JSON.parse(manifest)
  const manifestFiles = getManifestFlatFiles(manifestJSON)

  // ES Modules Dynamic Import https://dmitripavlutin.com/ecmascript-modules-dynamic-import/
  const { renderApp, renderError } = await import(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  // Fallback option: In case static import causes issues (e.g., due to ncc bundler),
  // use dynamic runtime import to load modules on demand.
  // Reference: https://github.com/vercel/ncc/issues/935#issuecomment-1189850042
  // const _import = new Function('p', 'return import(p)')
  // const { renderApp, renderError } = await _import(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  const sendRenderedResponse = (response: Response, rendered: RenderResult) => {
    response.status(rendered.code)
    response.set({ 'Content-Type': 'text/html' })
    response.end(
      resolveTemplate({
        template: resolveAssetsPrefix(template, manifestFiles, rendered.assetsPrefix),
        appHTML: rendered.appHTML,
        headHTML: rendered.headHTML,
        bodyScripts: `${rendered.stateScripts}\n${rendered.contextScripts}`
      })
    )
  }

  app.get('*all', async (request, response) => {
    const requestContext = createRequestContext(request)
    try {
      sendRenderedResponse(response, await renderApp(requestContext, cache))
    } catch (error: any) {
      sendRenderedResponse(response, await renderError(requestContext, error))
    }
  })
}
