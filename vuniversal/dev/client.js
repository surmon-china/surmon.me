const vunConfig = require('../../vun.config')

module.exports = async () => {
  const viteConfig = await vunConfig.vite('client', 'development')

  return {
    ...viteConfig,
    // TODO: 'client.ts' not bound index.html
    // entry: universal.clientEntry,
    mode: 'development',
    silent: true,
    sourcemap: true,
    emitAssets: true,
    emitManifest: true,
    emitIndex: true,
    minify: false,
    write: true,
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
