import type { SSRHeadPayload } from '@unhead/vue/server'

export interface TemplateInput {
  template: string
  appHTML: string
  headHTML: SSRHeadPayload
  bodyScripts: string
}

export const resolveTemplate = ({ template, appHTML, headHTML, bodyScripts }: TemplateInput) => {
  return (
    template
      // https://github.com/unjs/unhead/blob/main/packages/unhead/src/server/transformHtmlTemplate.ts
      .replace(/<title>[\s\S]*<\/title>/, '')
      // MARK: replace! $ sign & use function replacer
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
      .replace('<html>', () => `<html${headHTML.htmlAttrs}>`)
      .replace('<body>', () => `<body${headHTML.bodyAttrs}>`)
      .replace('<body>', () => `<body>${headHTML.bodyTagsOpen ? `\n${headHTML.bodyTagsOpen}` : ``}`)
      .replace('</head>', () => `${headHTML.headTags}\n</head>`)
      .replace('</body>', () => `${headHTML.bodyTags}\n</body>`)
      .replace('</body>', () => `${bodyScripts}\n</body>`)
      .replace(`<!--app-html-->`, () => appHTML)
  )
}
