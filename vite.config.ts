import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
const CWD = process.cwd()

// https://vitejs.dev/config/#conditional-config
export default defineConfig((params) => {
  console.info('vite config', params)
  const TARGET_ENV_CONFIG = loadEnv(params.mode, CWD)

  return {
    plugins: [vuePlugin()],
    root: path.resolve(__dirname),
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      minify: false
    },
    css: {
      // https://vitejs.dev/config/#css-preprocessoroptions
      preprocessorOptions: {
        scss: {
          // https://github.com/vitejs/vite/issues/520
          additionalData: `
              $cdn-url: '${TARGET_ENV_CONFIG.VITE_CDN_URL}';
              $source-url: '${TARGET_ENV_CONFIG.VITE_FE_URL}';
            `
        }
      }
    }
  }
})
