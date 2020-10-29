const fs = require('fs-extra')
const path = require('path')
const builtinModules = require('builtin-modules')
const { build, ssrBuild, createServer } = require('vite')
const rollup = require('rollup')
const nodemon= require('nodemon')
const chokidar = require('chokidar')
const packageJSON = require('./package.json')
const { universal, ...viteConfig } = require('./vite.config')

/**
 * TODO CSS: https://github.com/vitejs/vite/issues/149#issuecomment-628963222
*/

const buildClient = async () => build({
  ...viteConfig,
  entry: universal.clientEntry,
  outDir: '.vun/client',
  mode: 'development',
  emitIndex: true,
  emitAssets: true,
  emitManifest: true,
  minify: false,
  // cssCodeSplit: false,
  write: false,
  rollupOutputOptions: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'browser'
  }
})

const serverOutDir = '.vun/server'
const buildServer = async () => ssrBuild({
  ...viteConfig,
  entry: universal.serverEntry,
  outDir: serverOutDir,
  assetsDir: '.',
  mode: 'development',
  emitAssets: false,
  emitManifest: false,
  emitIndex: false,
  cssCodeSplit: false,
  minify: false,
  ssr: true,
  rollupInputOptions: {
    // onwarn() {},
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve#resolving-built-ins-like-fs
    // https://github.com/rollup/rollup-plugin-node-resolve/issues/146#issuecomment-490096810
    external: universal.independence
      ? []
      : [...builtinModules, ...Object.keys(packageJSON.dependencies)]
  },
  rollupOutputOptions: {
    inlineDynamicImports: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    format: 'cjs',
    exports: 'named',
    entryFileNames: '[name].js',
  },
  rollupPluginVueOptions: {
    target: 'node',
  }
})

const buildApp = async () => {
  try {
    // const [clientResult, serverResult] = await Promise.allSettled([
      // buildClient(),
      // buildServer(),
    // ])
    const clientResult = await buildClient()
    const cssFiles = clientResult[0].assets.filter(
      asset => asset.fileName.endsWith('.css')
    )
    console.log('Client build done!', clientResult, cssFiles)

    const serverResult = await buildServer()
    console.log('Server build done!', serverResult)
    return serverResult
  } catch (error) {
    console.error('构建错误', error)
    process.exit(1)
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

const clientServer = createServer({
  ...viteConfig
}).listen(3001)

let nodemoner = null
buildApp().then(serverResult => {
  console.log('First build done!', serverResult[0].assets[0].fileName)
  nodemoner = nodemoner || nodemon({
    script: path.join(serverOutDir, serverResult[0].assets[0].fileName),
    watch: serverOutDir
  }).on('restart', files => {
    console.log('nodemon restart', files)
  })
})

