const fs = require('fs-extra')
const path = require('path')
const rollup = require('rollup')
const chokidar = require('chokidar')
const nodemon = require('nodemon')
const { onRollupWarning, createBaseRollupPlugins } = require('vite')
const { createResolver, supportedExts } = require('vite/dist/node/resolver')
const { createBuildHtmlPlugin } = require('vite/dist/node/build/buildPluginHtml')
const { createReplacePlugin } = require('vite/dist/node/build/buildPluginReplace')
const { createBuildAssetPlugin } = require('vite/dist/node/build/buildPluginAsset')
const { createBuildCssPlugin } = require('vite/dist/node/build/buildPluginCss')
const { createBuildWasmPlugin } = require('vite/dist/node/build/buildPluginWasm')
const { createEsbuildPlugin, createEsbuildRenderChunkPlugin } = require('vite/dist/node/build/buildPluginEsbuild')
const { isCSSRequest } = require('vite/dist/node/utils/cssUtils')
const { defaultDefines } = require('vite/dist/node/config')

const startSSRServer = async () => {
  const devDir = path.resolve(process.cwd(), '.vun')
  const { universal, ...viteConfig } = require('./vite.config')
  const packageJSON = require('./package.json')
  const deps = Object.keys(packageJSON.dependencies)
  const watchPath = path.resolve(__dirname, 'src')

  const chokidarWatcher = chokidar.watch(watchPath, {
    ignored: [/node_modules/, /\.git/],
    // #610
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 10
    }
  })

  const universalConfig = {
    independence: true,
    ...universal
  }

  const {
    ssr = true,
    root = process.cwd(),
    base = '/',
    outDir = path.resolve(root || process.cwd(), '.vun'),
    assetsDir = '_assets',
    assetsInlineLimit = 4096,
    assetsInclude,
    cssCodeSplit = false,
    alias = {},
    resolvers = [],
    rollupPluginVueOptions = { target: 'node' },
    rollupInputOptions = {},
    rollupOutputOptions = {},
    emitIndex = false,
    emitAssets = false,
    write = true,
    minify = false,
    terserOptions = {},
    esbuildTarget = 'es2020',
    enableEsbuild = true,
    silent = false,
    sourcemap = false,
    shouldPreload = null,
    env = {},
    mode: configMode = 'development',
    define: userDefineReplacements = {},
    cssPreprocessOptions,
    cssModuleOptions = {}
  } = viteConfig

  const isTest = process.env.NODE_ENV === 'test'
  const resolvedMode = process.env.VITE_ENV || configMode

  // let spinner = undefined
  // const msg = `Building ${configMode} bundle...`
  // if (!silent) {
  //   if (process.env.DEBUG || isTest) {
  //     console.log(msg)
  //   } else {
  //     spinner = require('ora')(msg + '\n').start()
  //   }
  // }
  await fs.emptyDir(outDir)

  const indexPath = path.resolve(root, 'index.html')
  const publicBasePath = base.replace(/([^/])$/, '$1/') // ensure ending slash
  const resolvedAssetsPath = path.join(outDir, assetsDir)

  const resolver = createResolver(root, resolvers, alias, assetsInclude)
  const basePlugins = await createBaseRollupPlugins(root, resolver, viteConfig)
  const { htmlPlugin, renderIndex } = await createBuildHtmlPlugin(
    root,
    indexPath,
    publicBasePath,
    assetsDir,
    assetsInlineLimit,
    resolver,
    shouldPreload,
    viteConfig
  )

  // https://github.com/darionco/rollup-plugin-web-worker-loader
  // configured to support `import Worker from './my-worker?worker'`
  // this plugin relies on resolveId and must be placed before node-resolve
  // since the latter somehow swallows ids with query strings since 8.x
  basePlugins.splice(
    basePlugins.findIndex((p) => p.name.includes('node-resolve')),
    0,
    require('rollup-plugin-web-worker-loader')({
      targetPlatform: 'browser',
      pattern: /(.+)\?worker$/,
      extensions: supportedExts,
      sourcemap: false // it's inlined so it bloats the bundle
    })
  )

  // user env variables loaded from .env files.
  // only those prefixed with VITE_ are exposed.
  const userClientEnv = {}
  const userEnvReplacements = {}
  Object.keys(env).forEach((key) => {
    if (key.startsWith(`VITE_`)) {
      userEnvReplacements[`import.meta.env.${key}`] = JSON.stringify(env[key])
      userClientEnv[key] = env[key]
    }
  })

  const builtInClientEnv = {
    BASE_URL: publicBasePath,
    MODE: configMode,
    DEV: resolvedMode !== 'production',
    PROD: resolvedMode === 'production'
  }
  const builtInEnvReplacements = {}
  Object.keys(builtInClientEnv).forEach((key) => {
    builtInEnvReplacements[`import.meta.env.${key}`] = JSON.stringify(
      builtInClientEnv[key]
    )
  })
  Object.keys(userDefineReplacements).forEach((key) => {
    userDefineReplacements[key] = JSON.stringify(userDefineReplacements[key])
  })

  const rullupConfig = {
    // TODO: SSR 是 serverEntry | Client Entry
    // SPA 是 clientEntry
    // input: path.resolve(root, 'index.html'),
    input: universalConfig.serverEntry,
    external: universalConfig.independence
      ? []
      : ['vue', /^@vue\//, ...deps, ...(rollupInputOptions.external || [])],
    preserveEntrySignatures: false,
    treeshake: { moduleSideEffects: 'no-external' },
    // onwarn: onRollupWarning(spinner, viteConfig.optimizeDeps),
    // onwarn({ loc, frame, message }) {
    //   if (loc) {
    //     console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
    //     if (frame) console.warn(frame);
    //   } else {
    //     console.warn(message);
    //   }
    // },
    ...rollupInputOptions,
    plugins: [
      ...basePlugins,
      // vite:html
      htmlPlugin,
      // we use a custom replacement plugin because @rollup/plugin-replace
      // performs replacements twice, once at transform and once at renderChunk
      // - which makes it impossible to exclude Vue templates from it since
      // Vue templates are compiled into js and included in chunks.
      createReplacePlugin(
        (id) =>
          !/\?vue&type=template/.test(id) &&
          // also exclude css and static assets for performance
          !isCSSRequest(id) &&
          !resolver.isAssetRequest(id),
        {
          ...defaultDefines,
          ...userDefineReplacements,
          ...userEnvReplacements,
          ...builtInEnvReplacements,
          'import.meta.env.': `({}).`,
          'import.meta.env': JSON.stringify({
            ...userClientEnv,
            ...builtInClientEnv
          }),
          'process.env.NODE_ENV': JSON.stringify(resolvedMode),
          'process.env.': `({}).`,
          'process.env': JSON.stringify({ NODE_ENV: resolvedMode }),
          'import.meta.hot': `false`
        },
        sourcemap
      ),
      // vite:css
      createBuildCssPlugin({
        root,
        publicBase: publicBasePath,
        assetsDir,
        minify,
        inlineLimit: assetsInlineLimit,
        cssCodeSplit,
        preprocessOptions: cssPreprocessOptions,
        modulesOptions: cssModuleOptions
      }),
      // vite:asset
      createBuildAssetPlugin(
        root,
        resolver,
        publicBasePath,
        assetsDir,
        assetsInlineLimit
      ),
      createBuildWasmPlugin(root, publicBasePath, assetsDir, assetsInlineLimit),
      enableEsbuild
        ? createEsbuildRenderChunkPlugin(esbuildTarget, minify === 'esbuild')
        : undefined,
      // minify with terser
      // this is the default which has better compression, but slow
      // the user can opt-in to use esbuild which is much faster but results
      // in ~8-10% larger file size.
      minify && minify !== 'esbuild'
        ? require('rollup-plugin-terser').terser(terserOptions)
        : undefined,
      // #728 user plugins should apply after `@rollup/plugin-commonjs`
      // #471#issuecomment-683318951 user plugin after internal plugin
      ...(rollupInputOptions.plugins || [])
    ].filter(Boolean)
  }

  const watcher = rollup.watch({
    ...rullupConfig,
    output: {
      inlineDynamicImports: true,
      dir: outDir,
      format: 'cjs',
      exports: 'named',
      entryFileNames: 'index.js',
      chunkFileNames: '[name].js',
      ...rollupOutputOptions
    },
    watch: {
      chokidar: chokidarWatcher
    }
  })

  let nodemoner = null
  watcher.on('event', event => {
    // console.log('-----event', event)
    if (event.code === 'BUNDLE_END') {
      const distFile = outDir + '/index.js'
      console.log('BUILD DONE', distFile)
      nodemoner = nodemoner || nodemon({
        script: distFile,
        watch: outDir
      }).on('restart', files => {
        console.log('nodemon restart', files)
      })
    }
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误
  });

  console.log('🎉 SSR Start!', watcher)
}

startSSRServer().catch((e) => {
  console.error(e)
  process.exit(1)
})
