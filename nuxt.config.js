const path = require('path')
const webpack = require('webpack')
const apiConfig = require('./api.config')

module.exports = {
  cache: {
    max: 20,
    maxAge: 600000
  },
  loading: { color: '#2196f3' },
  build: {
    // 对webpack的扩展
    extend(webpackConfig) {
      webpackConfig.resolve.alias['~utils'] = path.join(__dirname, 'utils');
      webpackConfig.resolve.alias['~static'] = path.join(__dirname, 'static');
      webpackConfig.resolve.alias['~filters'] = path.join(__dirname, 'filters');
      webpackConfig.resolve.alias['~services'] = path.join(__dirname, 'services');
    },
    // 将重复引用的第三方模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'swiper',
      'marked',
      'gravatar',
      'clipboard',
      'highlight.js'
    ],
    // 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: true
    },
    // Run ESLINT on save
    /*
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
    */
  },
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: apiConfig.baseUrl
  },
  plugins: [
    '~plugins/ga.js',
    '~plugins/axios.js',
    '~plugins/clipboard.js',
    '~plugins/filters.js',
    '~plugins/swiper.js',
    '~plugins/marked.js',
    '~plugins/gravatar.js',
    '~plugins/vue-empty.js',
    '~plugins/copy-right.js',
    '~plugins/image-popup.js',
    '~plugins/vue-loading.js',
    '~plugins/vue-comment.js',
    '~plugins/baidu-seo-push.js'
  ],
  head: {
    title: 'Surmon.me - Talk is cheap. Show me the code',
    titleTemplate: '%s | Surmon.me',
    __dangerouslyDisableSanitizers: ['script'],
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: 'surmon@foxmail.com' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'surmon,马赐崇,司马萌,前端技术开发,javascript技术,worddpress 主题' },
      { hid: 'description', name: 'description', content: '凡心所向 素履所往 生如逆旅 一苇以航' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    script: [
      { type: 'text/javascript',
        innerHTML: ``
      }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  router: {
    middleware: ['change-page-col'],
    linkActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes) {}
  },
  css: [
    'swiper/dist/css/swiper.css',
    'highlight.js/styles/ocean.css',
    { src: '~assets/sass/app.scss', lang: 'sass' }
  ]
}
