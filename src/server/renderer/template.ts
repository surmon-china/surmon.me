import type { SSRHeadPayload } from '@unhead/ssr'
import type { Manifest } from 'vite'

// manifest: https://vitejs.dev/guide/backend-integration.html
// render manifeat json to HTML
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderAssetsByManifest = (manifest: Manifest, prefix: string) => {
  const item = Object.values(manifest)
  const entry = item.find((item) => item.isEntry)
  if (!entry) return ''

  const entryScript = entry.file
  const entryStyles = entry.css || []
  const entryImports = entry.imports || []
  const entryDynamicImports = entry.dynamicImports || []
  const importFiles = Array.from(new Set([...entryImports, ...entryDynamicImports])).map(
    (key) => manifest[key].file
  )

  return [
    `<script type="module" crossorigin src="${prefix}/${entryScript}"></script>`,
    ...importFiles.map((item) => `<link rel="modulepreload" crossorigin href="${prefix}/${item}">`),
    ...entryStyles.map((item) => `<link rel="stylesheet" href="${prefix}/${item}">`)
  ].join('\n')
}

// resolve assets URL prefix
const resolveAssetsPrefixByManiFest = (html: string, manifest: Manifest, prefix: string): string => {
  // List all the files in the manifest, when any file is matched, replace it with the prefix
  return Object.values(manifest).reduce((result, { file }) => {
    return result.replace(new RegExp(`(href|src)="/${file}"`, 'g'), `$1="${prefix}/${file}"`)
  }, html)
}

export const resolveTemplate = (input: {
  template: string
  heads: SSRHeadPayload
  appHTML: string
  scripts?: string
  extraScripts?: string
  manifest?: Manifest
  assetsPrefix?: string
}) => {
  let result = input.template

  // deterministically changing file prefixes with manifest
  if (input.assetsPrefix && input.manifest) {
    result = resolveAssetsPrefixByManiFest(result, input.manifest, input.assetsPrefix)
  }

  return (
    result
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
