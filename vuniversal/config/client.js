const vunConfig = require('../../vun.config')

module.exports = async mode => {
  const isProd = mode === 'production'
  const viteConfig = await vunConfig.vite('client', mode)

  return {
    ...viteConfig,
    // TODO: 'client.ts' not bound index.html
    // entry: universal.clientEntry,
    mode,
    emitAssets: true,
    emitManifest: true,
    emitIndex: true,
    write: true,
    silent: !isProd,
    sourcemap: isProd ? true : 'inline',
    minify: isProd ? 'terser' : false,
    env: {
      VITE_SSR: 'true',
      ...viteConfig.env
    },
    rollupOutputOptions: {
      ...viteConfig.rollupOutputOptions
    },
    rollupPluginVueOptions: {
      target: 'browser',
      ...viteConfig.rollupPluginVueOptions
    }
  }
}
