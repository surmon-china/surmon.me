const fs = require('fs-extra')
const path = require('path')
const { build } = require('vite')

exports.bundleSSRClent = async (paths) => {
  console.log('\nClient bundling...\n')
  await build({
    build: {
      outDir: paths.client,
      minify: true,
      emptyOutDir: false
    }
  })

  await fs.rename(
    path.resolve(paths.client, 'index.html'),
    path.resolve(paths.client, 'template.html')
  )
}
