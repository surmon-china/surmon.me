const fs = require('fs-extra')
const path = require('path')
const { build, ssrBuild } = require('vite')
const rollup = require('rollup')
const chokidar = require('chokidar')
const packageJSON = require('./package.json')
const { universal, ...viteConfig } = require('./vite.config')

/**
 * https://github.com/vitejs/vite/issues/149#issuecomment-628963222
 * CSS -> file
 * SSR Server -> html (link css) ->
*/

const buildClient = async () => build({
  entry: universal.clientEntry,
  outDir: '.vun/client',
  mode: 'development',
  emitIndex: true,
  emitAssets: true,
  emitManifest: true,
  minify: false,
  // cssCodeSplit: false,
  // write: false,
  rollupOutputOptions: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'browser'
  },
  ...viteConfig
})

const buildServer = async () => build({
  // entry: universal.serverEntry,
  entry: './src/server.ts',
  // outDir: '.vun/server',
  // mode: 'development',
  // emitAssets: false,
  // emitManifest: false,
  // cssCodeSplit: false,
  // minify: false,
  ssr: true,
  rollupInputOptions: {
    external: []
    // external: universal.independence
    //   ? []
    //   : [...Object.keys(packageJSON.dependencies)]
  },
  rollupOutputOptions: {
    // inlineDynamicImports: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    format: 'cjs',
    exports: 'named',
    entryFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'node',
  },
  ...viteConfig
})

const buildApp = async () => {
  try {
    // const [clientResult, serverResult] = await Promise.allSettled([
    //   buildClient(),
    //   buildServer(),
    // ])
    const serverResult = await buildServer()
    // const cssFiles = clientResult[0].assets.filter(
    //   asset => asset.fileName.endsWith('.css')
    // )
    // console.log('----clientResult cssFiles', clientResult[0])
    console.log('----serverResult', serverResult[0])
  } catch (error) {
    console.error('构建错误', error)
    // process.exit(1)
  }
}


const watcher = chokidar.watch(universal.srcDir, {
  ignored: [/node_modules/, /\.git/],
  awaitWriteFinish: {
    stabilityThreshold: 888,
    pollInterval: 10
  },
  ...universal.watchOptions
})

watcher.on('change', info => {
  console.log('File changed!', info)
  buildApp()
})

buildApp()
