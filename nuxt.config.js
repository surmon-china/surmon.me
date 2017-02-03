const path = require('path')

module.exports = {
  // Nuxt.js 使用 lru-cache 提供组件缓存功能以获得更好的渲染性能。
  cache: true,
  // 构建配置
  build: {
    // 对webpack的扩展
    extend (webpackConfig) {
      webpackConfig.resolve.alias['~'] = __dirname;
      webpackConfig.resolve.alias['~filters'] = path.join(__dirname, 'filters');
    },
    // Nuxt.js 允许你在自动生成的 vendor.bundle.js 文件中添加一些模块，以减少应用 bundle 的体积。这里说的是一些你所依赖的第三方模块 (比如 axios)
    vendor: [
      'axios', 
      // 'vue-duoshuo'
    ],
    // 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: false
    }
  },
  router: {
    linkActiveClass: 'active-link',
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: (process.env.NODE_ENV === 'production') ? 'https://api.surmon.me/' : 'http://localhost:8000/'
  },
  plugins: [
    // '~plugins/vue-duoshuo',
    // '~plugins/filters'
  ],
  // 头部配置
  head: {
    title: 'Surmon.me - Talk is cheap. Show me the code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', content: "Nuxt.js project" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  // Nuxt.js 让你可以定义全局 CSS 文件、模块、库（每个页面都会被引入）
  css: [
    '~assets/css/main.css',
    'highlight.js/styles/agate.css',
    { src: '~assets/sass/app.scss', lang: 'sass' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
