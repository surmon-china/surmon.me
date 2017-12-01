const path = require('path')
const webpack = require('webpack')
const apiConfig = require('./api.config')
const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  offline: true,
  loading: {
    color: '#2196f3'
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  build: {
    // analyze: true,
    // 设置 cdn 地址
    publicPath: apiConfig.cdnUrl + '/_nuxt/',
    // 对webpack的扩展
    extend(webpackConfig, { isDev, isClient, isServer }) {
      // 处理 Swiper4 下的 dom7 模块的语法问题
      webpackConfig.resolve.alias['swiper$'] = 'swiper/dist/js/swiper.js'
      webpackConfig.resolve.alias['dom7$'] = 'dom7/dist/dom7.js'
      // console.log('webpackConfig', webpackConfig)
      if (isProdMode) {
        const vueLoader = webpackConfig.module.rules.find(loader => loader.loader === 'vue-loader')
        if (vueLoader) {
          // 处理 Template 中的 cdn 地址
          vueLoader.options.loaders.html = path.resolve(__dirname, './extend/html-cdn-loader')
          // 处理 CSS 中的 cdn 地址
          const vueLoaders = vueLoader.options.loaders
          for (cssLoader in vueLoaders) {
            if (Array.isArray(vueLoaders[cssLoader])) {
              vueLoaders[cssLoader].forEach(loader => {
                if (loader.loader === 'css-loader') {
                  loader.options.root = apiConfig.cdnUrl
                }
              })
            }
          }
        }
      }
    },
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'howler',
      'swiper',
      'marked',
      'gravatar',
      'clipboard',
      'particles.js',
      'simplewebrtc',
      'socket.io-client'
    ],
    // 为 JS 和 Vue 文件定制 babel 配置。https://nuxtjs.org/api/configuration-build/#analyze
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
  dev: isProdMode,
  env: {
    baseUrl: apiConfig.baseUrl,
    HOST_URL: apiConfig.socketHost
  },
  plugins: [
    { src: '~/plugins/cdn.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/howler.js' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/marked.js' },
    { src: '~/plugins/gravatar.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/clipboard.js' },
    { src: '~/plugins/ga.js', ssr: false },
    { src: '~/plugins/offline.js', ssr: false },
    { src: '~/plugins/clmtrackr.js', ssr: false },
    { src: '~/plugins/emoji-233333.js', ssr: false },
    { src: '~/plugins/image-popup.js', ssr: false },
    { src: '~/plugins/copy-right.js', ssr: false },
    { src: '~/plugins/particles.js', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-empty.js' },
    { src: '~/plugins/vue-loading.js' },
    { src: '~/plugins/vue-comment.js' }
  ],
  head: {
    title: 'Surmon.me - Talk is cheap. Show me the code',
    titleTemplate: '%s | Surmon.me',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      // manifest: 'surmon.me',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { name: 'author', content: 'surmon@foxmail.com' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'surmon,马赐崇,司马萌,Vue教程,前端技术开发,javascript技术' },
      { hid: 'description', name: 'description', content: '凡心所向 素履所往 生如逆旅 一苇以航' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    script: [
      { 
        // async: 'async',
        // defer: 'defer',
        // type: 'text/javascript',
        // src: '/scripts/clmtrackr.js'
        // innerHTML: ``
      }
    ],
    // __dangerouslyDisableSanitizers: ['script'],
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
