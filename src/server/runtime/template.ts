import type { MetaResult } from '@/services/meta'

export const resolveTemplate = (config: {
  template: string
  appHTML: string
  metas: MetaResult
  scripts?: string
  manifest?: any
}) => {
  const { template, appHTML, metas, scripts, manifest } = config

  const bodyScripts = [
    scripts
    // TODO: manifest
    // manifest.xxx
  ].join('\n')

  const html = template
    .replace(/<title>[\s\S]*<\/title>/, '')
    .replace(`<html`, `<html ${metas.htmlAttrs} `)
    .replace(`<head>`, `<head>\n${metas.headTags}`)
    .replace(`<!--app-html-->`, appHTML)
    .replace(`<body>`, `<body ${metas.bodyAttrs}>`)
    .replace(`</body>`, `\n${bodyScripts}\n</body>`)

  return html
}
