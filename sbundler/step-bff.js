import fs from 'fs-extra'
import path from 'path'
import builtinModules from 'builtin-modules'
import ncc from '@vercel/ncc'

export const bundleBFFServer = (paths) => {
  // https://github.com/vercel/ncc#programmatically-from-nodejs
  return ncc(path.resolve(paths.src, 'bff.ts'), {
    sourceMap: false,
    assetBuilds: false,
    externals: [
      ...builtinModules,
      ...Object.keys(paths.packageJSON.dependencies),
      ...Object.keys(paths.packageJSON.devDependencies)
    ]
  }).then(({ code }) => {
    fs.writeFileSync(path.resolve(paths.dist, 'bff.js'), code)
  })
}
