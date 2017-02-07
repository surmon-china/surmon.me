const path = require('path')
const webpack = require('webpack')
const isProdMode = process.env.NODE_ENV === 'production'
const nuxtConfig = {
  api: process.env.baseUrl || (isProdMode ? 'http://api.surmon.me/' : 'http://localhost:8000/'),
  duoshuoShortName: (isProdMode ? 'surmon' : 'localhost-3000')
}

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
      'cheerio',
      'clipboard',
      'highlight.js',
      'mini-toastr',
      'vue-notifications',
    ],
    // 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: true
    }
  },
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: nuxtConfig.api,
    duoshuoShortName: nuxtConfig.duoshuoShortName
  },
  plugins: [
    '~plugins/axios.js',
    '~plugins/cheerio.js',
    '~plugins/clipboard.js',
    '~plugins/highlight.js',
    '~plugins/filters.js',
    '~plugins/vue-empty.js',
    '~plugins/vue-loading.js',
    '~plugins/vue-duoshuo.js',
    '~plugins/vue-comment-hidden.js',
    // '~plugins/vue-disqus.js',
    '~plugins/vue-awesome-swiper',
    '~plugins/vue-notifications.js'
  ],
  head: {
    title: 'Surmon.me - Talk is cheap. Show me the code',
    titleTemplate: '%s | Surmon.me',
    __dangerouslyDisableSanitizers: ['script'],
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: 'surmon@foxmail.com' },
      { name: 'viewport', content: 'initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'surmon, 司马萌, 前端技术开发, javascript' },
      { hid: 'description', name: 'description', content: '凡心所向 素履所往 生如逆旅 一苇以航' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    script: [
      { innerHTML: `window.duoshuoQuery = { short_name: '${nuxtConfig.duoshuoShortName}' }`, type: 'text/javascript' },
      { src: 'http://static.duoshuo.com/embed.js' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
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
    'swiper/dist/css/swiper.css',
    'highlight.js/styles/agate.css',
    { src: '~assets/sass/app.scss', lang: 'sass' }
  ]
}
