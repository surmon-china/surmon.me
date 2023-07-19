import { build } from 'vite'

export const bundleSSRClent = async (paths) => {
  await build({
    build: {
      outDir: paths.client,
      minify: true,
      emptyOutDir: false
    }
  })
}
