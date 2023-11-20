import type { SSRHeadPayload } from '@unhead/ssr'

export const resolveTemplate = (input: {
  template: string
  heads: SSRHeadPayload
  appHTML: string
  scripts?: string
  extraScripts?: string
}) => {
  return (
    input.template
      // MARK: replace! $ sign & use function replacer
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
      // https://github.com/vueuse/head#ssr-rendering
      .replace(/<title>[\s\S]*<\/title>/, '')
      .replace(`<html`, () => `<html ${input.heads.htmlAttrs} `)
      .replace(`<head>`, () => `<head>\n${input.heads.headTags}`)
      .replace(`<body>`, () => `<body ${input.heads.bodyAttrs}>`)
      .replace(`</body>`, () => `\n${input.heads.bodyTags}\n${input.scripts}\n${input.extraScripts}\n</body>`)
      .replace(`<!--app-html-->`, () => input.appHTML)
  )
}
