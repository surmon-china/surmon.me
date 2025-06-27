import { build } from 'vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export const bundleClientRender = async (paths) => {
  const plugins = []
  if (process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
      sentryVitePlugin({
        // https://docs.sentry.io/platforms/javascript/configuration/tree-shaking/
        // bundleSizeOptimizations: { ... }
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'surmon-me',
        project: 'surmon-me-website',
        release: {
          name: paths.packageJSON.version
        }
      })
    )
  }

  await build({
    plugins,
    build: {
      outDir: paths.client,
      sourcemap: true,
      minify: true,
      manifest: true,
      emptyOutDir: false
      // https://github.com/vitejs/vite/pull/9938
      // https://vite.dev/config/build-options.html#build-modulepreload
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload
      // MARK: if dynamic import cannot be set correctly, `modulePreload` should be disabled here.
      // HTML: `<link rel=modulepreload ...>`
      // modulePreload: false
    }
  })
}
