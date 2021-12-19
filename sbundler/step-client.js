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
}
