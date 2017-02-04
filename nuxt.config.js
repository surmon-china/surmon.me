const path = require('path')

module.exports = {
  cache: true,
  loading: { color: '#2196f3' },
  build: {
    // 对webpack的扩展
    extend(webpackConfig) {
      webpackConfig.resolve.alias['~utils'] = path.join(__dirname, 'utils');
      webpackConfig.resolve.alias['~filters'] = path.join(__dirname, 'filters');
      webpackConfig.resolve.alias['~services'] = path.join(__dirname, 'services');
    },
    // 将重复引用的第三方模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'mini-toastr',
      'vue-notifications',
      // '~plugins/vue-loading',
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
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: process.env.baseUrl || (process.env.NODE_ENV === 'production' ? 'http://api.surmon.me/' : 'http://localhost:8000/')
  },
  plugins: [
    '~plugins/axios.js',
    '~plugins/filters.js',
    '~plugins/vue-empty.js',
    '~plugins/vue-loading.js',
    // '~plugins/vue-duoshuo',
    // '~plugins/vue-awesome-swiper',
    '~plugins/vue-notifications.js',
  ],
  head: {
    titleTemplate: '%s - Talk is cheap. Show me the code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'keywords', content: 'surmon, 司马萌, 前端技术开发'},
      { hid: 'description', name: 'description', content: '凡心所向 素履所往 生如逆旅 一苇以航' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    linkActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes) {}
  },
  css: [
    // 'swiper/dist/css/swiper.css',
    'highlight.js/styles/agate.css',
    { src: '~assets/sass/app.scss', lang: 'sass' }
  ]
}
