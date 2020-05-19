
const isProd = process.env.NODE_ENV === 'production'
const SCSS_VARIABLES_INIT = './src/assets/styles/init.scss'
const SCSS_VARIABLES_PROD_OVER = './src/assets/styles/production.scss'
const SCSS_VARIABLES = isProd
  ? [SCSS_VARIABLES_PROD_OVER, SCSS_VARIABLES_INIT]
  : [SCSS_VARIABLES_INIT]

module.exports = {
  universal: true,
  modern: true,
  clientEntry: './src/client.ts',
  serverEntry: './src/server.ts',
  // template: './src/app.html',
  env: {
    // BASE: apiConfig.BASE,
    // HOST_URL: apiConfig.SOCKET
  },
  prerender: {
    fallback: false,
    routes: [
      '/service',
      '/about',
      '/app',
      // '/vue-awesome-swiper',
      // '/vue-quill-editor',
      // '/vue-video-player',
      // '/vue-codemirror',
      // '/vue-touch-ripple',
      // '/vue-drag-zone'
    ]
  },
  build: {
    analyze: true,
    // publicPath: apiConfig.CDN + '/vun/',
    css: {
      sourceMap: true,
      styleResources: {
        scss: SCSS_VARIABLES
      }
    },
    optimization: {
      splitChunks: {
        // maxInitiaSize: 360000,
        maxSize: 360000,
        cacheGroups: {
          expansions: {
            name: 'expansions',
            test(module) {
              return /swiper|dom7|233333|lozad|marked|favico|amplitude|highlight|ua-parser|vue-analytics|vue-google-adsense/.test(module.context);
            },
            chunks: 'initial',
            priority: 10,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  webpack(webpackConfig, buildContext) {
    // MARK: Just run in test
    // config.resolve.alias['vue-awesome-swiper'] = path.join(__dirname, 'development', 'vue-awesome-swiper', 'src')
  }
}
