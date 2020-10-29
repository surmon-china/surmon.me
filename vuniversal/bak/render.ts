
import path from 'path'
import fs from 'fs-extra'
import templateParser from 'lodash/template'
import { renderToString } from '@vue/server-renderer'
import { NodeEnv, VueEnv, isDev } from '../env'
import { AppCreater } from './creater'

export interface RenderOptions {
  // appCreater: AppCreater
  appCreater: any
  url: string
}

export interface TemplateRenderParameters {
  target: VueEnv
  environment: NodeEnv
  state?: any,
  meta?: any
  appHTML?: string
  assets: {
    js: string[]
    css: string[]
  }
}

export async function render(options: RenderOptions): Promise<string> {
  const { app, router, state, ...rest } = options.appCreater()
  // TODO: 404 路由会如何反应呢，会不会是 404，这里应该区分 404 和 500
  await router.push(options.url)

  console.log('-----ssr render', typeof rest)

  const template = fs.readFileSync(
    isDev
      ? process.env.VUN_SSR_TEMPLATE as string
      : path.join(__dirname, 'template.html')
  ).toString()
  const assets = fs.readJSONSync(
    isDev
      ? process.env.VUN_CLIENT_MANIFEST as string
      : path.join(__dirname, 'client.manifest.json')
  )

  const HTML_ATTRS = ''
  const HEAD_ATTRS = ''
  const BODY_ATTRS = ''

  const APP = await renderToString(app)

  const HEAD = [
    `<title>Welcome to vuniversal! ⚡</title>`,
    ...assets.css.map((css: string) => `<link rel="stylesheet" href="${css}">`)
  ].join('\n')

  const FOOTER = [
    `<script>window.__INIT_STATE__ = ${JSON.stringify(state)}</script>`,
    ...assets.js.map((js: string) => `<script src="${js}" defer crossorigin></script>`)
  ].join('\n')

  return templateParser(template, {
    interpolate: /{{([\s\S]+?)}}/g,
    evaluate: /{%([\s\S]+?)%}/g
  })({
    HTML_ATTRS,
    HEAD_ATTRS,
    BODY_ATTRS,
    HEAD,
    APP,
    FOOTER
  })
}
