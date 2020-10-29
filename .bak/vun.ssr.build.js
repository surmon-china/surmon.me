const vite = require('vite')
const path = require('path')
const chokidar = require('chokidar')
const nodemon = require('nodemon')
const { writeFileSync, rmdirSync } = require('fs')
const renderer = require('@vue/server-renderer')
const { ssrBuild, build, createServer } = vite

const doBuild = async () => {
  // nodemoner?.
  const devDir = path.resolve(process.cwd(), '.vun')

  // Classic client build. Output assets, and index.html. Returns chunks and generated html.
  // const clientResult = await build({ outDir })

  // Build for server side (imports are replaced by requires, and no assets)
  const options = require('./vite.config')
  const packageJSON = require('./package.json')
  const deps = Object.keys(packageJSON.dependencies)

  // console.log('----ssrbuild')
  const result = await build({
    ...options,
    mode: 'development',
    outDir: devDir,
    assetsDir: '.',
    ssr: true,
    minify: false,
    emitIndex: false,
    emitAssets: false,
    cssCodeSplit: false,
    // write: false,
    enableRollupPluginVue: true,
    rollupPluginVueOptions: {
      target: 'node'
    },
    // Important to keep the export createApp in the main.js.
    rollupInputOptions: {
      input: 'src/server.ts',
      preserveEntrySignatures: 'allow-extension',
      external: ['vue', /^@vue\//, 'swiper', ...deps],
    },
    rollupOutputOptions: {
      // inlineDynamicImports: true,
      format: 'cjs',
      exports: 'named',
      // exports: 'none',
      entryFileNames: 'server.js',
      chunkFileNames(chunkInfo) {
        console.log('-----chunkInfo', chunkInfo.name)
        return chunkInfo.name + '.js'
      },
      dir: devDir,
    },
    vueCompilerOptions: {
      directiveTransforms: {
        i18n(prop, node, context) {
          // console.log('啥也没有', prop, node, context)
          return { props: [] }
        },
        swiper(prop, node, context) {
          // console.log('啥也没有', prop, node, context)
          return { props: [] }
        }
      }
    },
  })

  const jsFile = result.assets[0];
  const { source, ...other } = jsFile;

  // nodemoner = nodemon({ exec: jsFile.code })
  // nodemoner = nodemon({ exec: `console.log('123123123')` })
  // nodemoner = nodemoner || nodemon({ script: devDir + '/server.js' })

  console.log('-------build done', jsFile.code.length)

  // We import our main.js createApp from the new server flavored built file.
  // Render the html of the app, and insert it in the generated index.html built for client side.
  // const content = await renderer.renderToString(createApp())
  // const indexPath = path.resolve(outDir, 'index.html')
  // const indexOutput = clientResult.html.replace(
  //   '<div id="app">',
  //   `<div id="app" data-server-rendered="true">${content}`,
  // )

  // Write the new file and remove the server build, we don't need it anymore.
  // writeFileSync(indexPath, indexOutput)

  // rmdirSync(tmpDir, { recursive: true })

  console.log('🎉 Page generated!')
  // process.exit()
}

doBuild().catch((e) => {
  console.error(e)
  process.exit(1)
})
