const path = require('path')
const builtinModules = require('builtin-modules')
const packageJSON = require('../package.json')
const { bundle } = require('@surmon-china/libundler')

exports.bundleSLSServer = (paths) => {
  console.log('\nServerless server bundling...\n')
  return bundle({
    libName: 'sls',
    entry: 'src/sls.ts',
    outDir: paths.dist,
    outFileName: 'sls',
    targets: ['cjs'],
    parser: false,
    sourcemap: true,
    minimize: false,
    alias: {
      entries: {
        '@': path.resolve(__dirname, '..', 'src')
      }
    },
    external: [
      ...builtinModules,
      ...Object.keys(packageJSON.dependencies),
      ...Object.keys(packageJSON.devDependencies)
    ],
    typescript: {
      tsconfig: path.resolve(__dirname, '..', 'tsconfig.json')
    }
  })
}
