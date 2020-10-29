const fs = require('fs-extra')
const path = require('path')
const { build } = require('vite')
const rollup = require('rollup')
const chokidar = require('chokidar')
const { defaultDefines } = require('vite/dist/node/config')
const { universal, ...viteConfig } = require('./vite.config')

const buildCLient = async () => {
  build({
    entry: 'src/client.ts',
    outDir: '.vun/client',
    assetsDir: 'assets',
    mode: 'development',
    minify: false,
    emitManifest: true,
    rollupOutputOptions: {
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
    },
    rollupPluginVueOptions: {
      target: 'browser',
    },
    ...viteConfig
  })
}

buildCLient().catch((e) => {
  console.error(e)
  process.exit(1)
})
