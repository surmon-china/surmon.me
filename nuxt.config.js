/**
 * @file Nuxt config / Commonjs module
 * @module nuxt.config
 * @author Surmon <https://github.com/surmon-china>
 */

const path = require('path')
const webpack = require('webpack')
const appConfig = require('./config/app.config')
const apiConfig = require('./config/api.config')
const i18nConfig = require('./config/i18n.config')
const systemConstants = require('./constants/system')
const { isProdMode, isDevMode } = require('./environment')

const htmlLang = i18nConfig.default || systemConstants.Language.Zh
const htmlSlogan = i18nConfig.data.text.slogan[htmlLang]

module.exports = {
  mode: 'universal',
  modern: true, // 编译为现代 ES Module，并自动分辨浏览器输出
  dev: isDevMode,
  env: {
    baseUrl: apiConfig.baseUrl,
    HOST_URL: apiConfig.socketHost
  },
  loading: {
    color: appConfig.color.primary
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  build: {
    analyze: process.argv.join('').includes('analyze'), // 分析
    maxChunkSize: 360000, // 单个包最大尺寸
    extractCSS: true, // 单独提取 css
    publicPath: apiConfig.cdnUrl + '/_nuxt/',
    postcss: {
      plugins: { 'postcss-custom-properties': { warnings: false }}
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          expansions: {
            name: 'expansions',
            test(module) {
              return /swiper|233333|howler|lozad|marked|favico|rtcpeerconnection|webrtc|highlight/.test(module.context);
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
          },
          // page -> 合并组件会导致运行异常
          /*
          page: {
            name: 'page',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
            priority: -20
          }
          */
        }
      }
    },
    // 对 webpack 的扩展
    extend(webpackConfig, { isDev, isClient }) {
      // 处理 Swiper4 下的 dom7 模块的语法问题
      webpackConfig.resolve.alias.dom7$ = 'dom7/dist/dom7.js'
      webpackConfig.resolve.alias.swiper$ = 'swiper/dist/js/swiper.js'
      if (isDev && isClient) {
        webpackConfig.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: [/(node_modules)/, /underscore-simple/, /webrtc/]
        })
      }
      if (isProdMode) {
        // 处理 Template 和 CSS 中的 cdn 地址
        const vueLoader = webpackConfig.module.rules.find(loader => loader.loader === 'vue-loader')
        if (vueLoader) {
          // vueLoader.options.loaders.html = path.resolve(__dirname, './extend/html-cdn-loader')
          const vueLoaders = vueLoader.options.loaders
          for (const cssLoader in vueLoaders) {
            if (Array.isArray(vueLoaders[cssLoader])) {
              const targetLoader = vueLoaders[cssLoader].find(loader => loader.loader === 'css-loader')
              targetLoader && (targetLoader.options.root = apiConfig.cdnUrl)
            }
          }
        }
      }
    },
    // 为 JS 和 Vue 文件定制 babel 配置 -> https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      comments: true,
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator'
      ],
      presets({ isServer }) {
        return [
          [
            '@nuxtjs/babel-preset-app',
            { targets: isServer ? { node: '10.4.0' } : { chrome: 69 } }
          ]
        ]
      }
    }
  },
  plugins: [
    { src: '~/plugins/vue-extend' },
    { src: '~/plugins/loaded-task' },
    { src: '~/plugins/marked' },
    { src: '~/plugins/gravatar' },
    { src: '~/plugins/highlight' },
    { src: '~/plugins/lozad', mode: 'client' },
    { src: '~/plugins/favico', mode: 'client' },
    { src: '~/plugins/adsense', mode: 'client' },
    { src: '~/plugins/swiper', mode: 'client' },
    { src: '~/plugins/analytics', mode: 'client' },
    { src: '~/plugins/emoji-233333', mode: 'client' },
    { src: '~/plugins/image-popup', mode: 'client' },
    { src: '~/plugins/iframe-popup', mode: 'client' },
    { src: '~/plugins/copy-right', mode: 'client' },
    // { src: '~/plugins/particles', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    ['@nuxtjs/axios', { baseURL: apiConfig.baseUrl }]
  ],
  head: {
    title: `${appConfig.meta.title} - ${htmlSlogan}`,
    titleTemplate: `%s | ${appConfig.meta.title}`,
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: htmlLang
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
      { name: 'author', content: appConfig.meta.email },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: appConfig.meta.title },
      { name: 'apple-touch-icon', content: '/static/icon.png' },
      { name: 'msapplication-TileImage', content: '/static/icon.png' },
      { name: 'msapplication-TileColor', content: appConfig.color.primary },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: appConfig.meta.keywords },
      { hid: 'description', name: 'description', content: appConfig.meta.description }
    ],
    link: [
      { rel: 'dns-prefetch', href: `//surmon.me` },
      { rel: 'dns-prefetch', href: '//api.surmon.me' },
      { rel: 'dns-prefetch', href: '//cdn.surmon.me' },
      { rel: 'dns-prefetch', href: '//static.surmon.me' },
      { rel: 'dns-prefetch', href: '//gravatar.surmon.me' },
      { rel: 'dns-prefetch', href: '//at.alicdn.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//adservice.google.com' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//googleads.g.doubleclick.net' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'dns-prefetch', href: '//tpc.googlesyndication.com' },
      { rel: 'dns-prefetch', href: '//pagead2.googlesyndication.com' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ],
  },
  workbox: {
    // runtimeCaching: [
    //   {
    //     urlPattern: 'https://my-cdn.com/.*',
    //     handler: 'networkFirst',
    //     method: 'GET'
    //   }
    // ]
  },
  manifest: {
    name: appConfig.meta.title,
    short_name: appConfig.meta.author,
    theme_color: appConfig.color.primary,
    background_color: '#eee',
    description: htmlSlogan,
    display: 'standalone',
    lang: htmlLang
  },
  icon: {
    iconSrc: '/static/icon.png',
    sizes: [16, 120, 144, 152, 192, 384, 512]
  },
  router: {
    middleware: ['change-page-col'],
    linkActiveClass: 'link-active',
    extendRoutes(routes) {},
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
  },
  css: [
    'swiper/dist/css/swiper.css',
    'highlight.js/styles/ocean.css',
    { src: '~assets/sass/app.scss', lang: 'sass' }
  ],
  styleResources: {
    scss: './assets/sass/init.scss',
  }
}
