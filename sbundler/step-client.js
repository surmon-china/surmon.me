import { build } from 'vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export const bundleClientRender = async (paths) => {
  const plugins = []
  if (process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
      sentryVitePlugin({
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
      emptyOutDir: false,
      // MARK: disabled `<link rel=modulepreload ...>`
      // https://github.com/vitejs/vite/pull/9938
      // https://vitejs.dev/config/build-options.html#build-modulepreload
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload
      modulePreload: false
    }
  })
}
