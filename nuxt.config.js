const path = require('path')
const webpack = require('webpack')
const apiConfig = require('./api.config')

module.exports = {
  cache: {
    max: 20,
    maxAge: 600000
  },
  // offline: true,
  loading: { color: '#2196f3' },
  build: {
    // analyze: true,
    // analyze: {
    //   analyzerMode: 'static'
    // },
    // 对webpack的扩展
    extend(webpackConfig, { isDev, isClient, isServer }) {
      /*
      webpackConfig.resolve.alias['~utils'] = path.join(__dirname, 'utils')
      webpackConfig.resolve.alias['~static'] = path.join(__dirname, 'static')
      webpackConfig.resolve.alias['~filters'] = path.join(__dirname, 'filters')
      webpackConfig.resolve.alias['~services'] = path.join(__dirname, 'services')
      console.log(webpackConfig.module.rules)
      // webpackConfig.module.rules.push({
      //   test: /\.scss$/,
      //   use: ['vue-style-loader?sourceMap', 'css-loader?sourceMap', 'sass-loader']
      // })
      */
    },
    plugins: [
      // new webpack.ContextReplacementPlugin(
      //   /highlight\.js\/lib\/languages$/,
      //   new RegExp(`^./(${['javascript', 'python', 'bash', 'css', 'html', 'php', 'go', 'less', 'json', 'scss', 'nginx', 'shell', 'sql', 'stylus', 'typescript'].join('|')})$`),
      // ),
    ],
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'howler',
      'swiper',
      'marked',
      'gravatar',
      // 'clmtrackr',
      'clipboard',
      'particles.js',
      'simplewebrtc',
      'socket.io-client'
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
    baseUrl: apiConfig.baseUrl,
    HOST_URL: apiConfig.socketHost
  },
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/howler.js' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/marked.js' },
    { src: '~/plugins/gravatar.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/clipboard.js' },
    { src: '~/plugins/ga.js', ssr: false },
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
    // __dangerouslyDisableSanitizers: ['script'],
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
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
      /*
      { 
        async: 'async',
        defer: 'defer',
        type: 'text/javascript',
        src: 'https://platform.linkedin.com/badges/js/profile.js'
        // innerHTML: ``
      }
      */
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
