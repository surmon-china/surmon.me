const { ssrBuild, build } = require('vite')
const typescript = require('rollup-plugin-typescript')
// const replace = require('@rollup/plugin-replace');

;(async () => {
  const clientResult = await build({
    outDir: 'dist/client',
    rollupInputOptions: {
      input: './src/client.ts',
      plugins: [
        typescript()
      ]
    },
  })

  const serverResult = await ssrBuild({
    outDir: 'dist/server',
    rollupPluginVueOptions: {
      target: 'node'
    },
    rollupInputOptions: {
      plugins: [
        // typescript()
      //   replace({
      //     __HTML__: clientResult.html.replace('<div id="app">', '<div id="app" data-server-rendered="true">${html}')
      //   })
      ],
      input: './src/server.ts'
    },
  })
})()
