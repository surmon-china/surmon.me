import fs from 'fs'
import path from 'path'
import type { Manifest } from 'vite'
import type { RenderResult } from '@/server-entry'
import type { CacheStore } from '@/server/services/cache'
import type { RequestResult } from '@/server/main/responder'
import type { RequestContext } from '@/server/main'
import { MIME_TYPES } from '@/constants/mime-type'
import { DIST_PATH, PROD_SERVER_PATH } from '@/configs/bff.env'
import { resolveAssetsPrefix, getManifestFlatFiles } from './_manifest'
import { resolveTemplate } from './_template'

export const createProdRenderer = async (cache: CacheStore) => {
  const template = fs.readFileSync(path.resolve(DIST_PATH, 'template.html'), 'utf-8')
  const manifest = fs.readFileSync(path.resolve(DIST_PATH, 'manifest.json'), 'utf-8')
  const manifestJSON: Manifest = JSON.parse(manifest)
  const manifestFiles = getManifestFlatFiles(manifestJSON)

  // Fallback option: In case static import causes issues (e.g., due to ncc bundler),
  // use dynamic runtime import to load modules on demand.
  // Reference: https://github.com/vercel/ncc/issues/935#issuecomment-1189850042
  // const _import = new Function('p', 'return import(p)')
  // const { renderApp, renderError } = await _import(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  // ES Modules Dynamic Import https://dmitripavlutin.com/ecmascript-modules-dynamic-import/
  const { renderApp, renderError } = await import(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  const resolveRendered = (rendered: RenderResult): RequestResult => ({
    contentType: MIME_TYPES.html,
    status: rendered.code,
    body: resolveTemplate({
      template: resolveAssetsPrefix(template, manifestFiles, rendered.assetsPrefix),
      appHTML: rendered.appHTML,
      headHTML: rendered.headHTML,
      bodyScripts: `${rendered.stateScripts}\n${rendered.contextScripts}`
    })
  })

  const render = async (context: RequestContext) => {
    try {
      return resolveRendered(await renderApp(context, cache))
    } catch (error: unknown) {
      return resolveRendered(await renderError(context, error))
    }
  }

  return { render }
}
