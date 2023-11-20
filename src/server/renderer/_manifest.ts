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

export const getManifestFlatFiles = (manifest: Manifest): string[] => {
  const files = new Set<string>()
  Object.values(manifest).forEach((item) => {
    files.add(item.file)
    item.css?.forEach((css) => files.add(css))
    item.imports?.forEach((imports) => files.add(imports))
    item.dynamicImports?.forEach((dynamicImports) => files.add(dynamicImports))
  })
  return Array.from(files)
}

// deterministically resolve file URL prefixes with manifest
export const resolveAssetsPrefix = (html: string, manifestFiles: string[], filePrefix: string): string => {
  // List all the files in the manifest, when any file is matched, replace it with the prefix
  return manifestFiles.reduce((result, file) => {
    return result.replace(new RegExp(`(href|src)="/${file}"`, 'g'), `$1="${filePrefix}/${file}"`)
  }, html)
}
