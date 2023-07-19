import type { SSRHeadPayload } from '@unhead/ssr'

export const resolveTemplate = (config: {
  template: string
  appHTML: string
  heads: SSRHeadPayload
  scripts?: string
  manifest?: any
}) => {
  const { template, appHTML, heads, scripts } = config

  const bodyScripts = [
    scripts
    // MARK: https://cn.vitejs.dev/config/#build-ssrmanifest
    // client output less assets (3 js + 1 css) & built-in HTML
    // manifest
  ].join('\n')

  const html = template
    // MARK: replace! $ sign & use function replacer
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
    // https://github.com/vueuse/head#ssr-rendering
    .replace(/<title>[\s\S]*<\/title>/, '')
    .replace(`<html`, () => `<html ${heads.htmlAttrs} `)
    .replace(`<head>`, () => `<head>\n${heads.headTags}`)
    .replace(`<!--app-html-->`, () => appHTML)
    .replace(`<body>`, () => `<body ${heads.bodyAttrs}>`)
    .replace(`</body>`, () => `\n${heads.bodyTags}\n</body>`)
    .replace(`</body>`, () => `\n${bodyScripts}\n</body>`)

  return html
}
