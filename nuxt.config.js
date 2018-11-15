/**
 * @file App config / Commonjs module
 * @module nuxt.config
 * @author Surmon <https://github.com/surmon-china>
 */

const path = require('path')
const webpack = require('webpack')
const apiConfig = require('./api.config')
const i18nConfig = require('./i18n.config')
const { isProdMode, isDevMode } = require('./environment')

const htmlLang = i18nConfig.default || 'zh'
const htmlSlogan = htmlLang === 'zh' ? '欢喜勇猛，向死而生' : 'Talk is cheap. Show me the code.'

module.exports = {
  mode: 'universal',
  dev: isDevMode,
  env: {
    baseUrl: apiConfig.baseUrl,
    HOST_URL: apiConfig.socketHost
  },
  loading: {
    color: '#0088f5'
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  build: {
    // analyze: true,
    // 设置 cdn 地址
    publicPath: apiConfig.cdnUrl + '/_nuxt/',
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    // 单独提取 css
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          /*
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
          */
        }
      }
    },
    // 对webpack的扩展
    extend(webpackConfig, { isDev, isClient }) {
      // 处理 Swiper4 下的 dom7 模块的语法问题
      webpackConfig.resolve.alias.dom7$ = 'dom7/dist/dom7.js'
      webpackConfig.resolve.alias.swiper$ = 'swiper/dist/js/swiper.js'
      if (isDev && isClient) {
        // Run ESLINT on save
        webpackConfig.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: [/(node_modules)/, /underscore-simple/, /webrtc/]
        })
      }
      if (isProdMode) {
        const vueLoader = webpackConfig.module.rules.find(loader => loader.loader === 'vue-loader')
        if (vueLoader) {
          // 处理 Template 中的 cdn 地址
          // vueLoader.options.loaders.html = path.resolve(__dirname, './extend/html-cdn-loader')
          // 处理 CSS 中的 cdn 地址
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
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'howler',
      'swiper',
      'marked',
      'gravatar',
      'highlight.js',
      // 'particles.js',
      'simplewebrtc',
      'bezier-easing',
      'socket.io-client'
    ],
    maxChunkSize: 350000,
    // 为 JS 和 Vue 文件定制 babel 配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      presets({ isServer }) {
        return [
          [
            '@nuxtjs/babel-preset-app',
            { targets: isServer ? { node: '10.4.0' } : { chrome: 69 } }
          ]
        ]
      },
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator'
      ],
      comments: true
    },
    styleResources: {
      scss: './assets/sass/init.scss',
      options: {}
    }
  },
  plugins: [
    { src: '~/plugins/vue-extend.js' },
    { src: '~/plugins/loaded-task.js' },
    { src: '~/plugins/marked.js' },
    { src: '~/plugins/gravatar.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/adsense.js', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/analytics.js', ssr: false },
    { src: '~/plugins/emoji-233333.js', ssr: false },
    { src: '~/plugins/image-popup.js', ssr: false },
    { src: '~/plugins/copy-right.js', ssr: false },
    // { src: '~/plugins/particles.js', ssr: false }
  ],
  head: {
    title: `Surmon.me - ${htmlSlogan}`,
    titleTemplate: '%s | Surmon.me',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: htmlLang
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
      { name: 'author', content: 'surmon@foxmail.com' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'Surmon.me' },
      { name: 'apple-touch-icon', content: '/static/icon.png' },
      { name: 'msapplication-TileImage', content: '/static/icon.png' },
      { name: 'msapplication-TileColor', content: '#0088f5' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'Surmon,马赐崇,司马萌,Vue开发者,前端技术开发,javascript技术' },
      { hid: 'description', name: 'description', content: '凡心所向，素履所往，生如逆旅，一苇以航' }
    ],
    link: [
      { rel: 'dns-prefetch', href: '//surmon.me' },
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
    script: [
      /*
      {
        body: true,
        async: 'async',
        type: 'text/javascript',
        src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      },
      {
        body: true,
        type: 'text/javascript',
        innerHTML: `
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: 'ca-pub-4710915636313788',
          enable_page_level_ads: false
        });`
      }
      */
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  manifest: {
    name: 'Surmon.me',
    short_name: 'Surmon',
    theme_color: '#0088f5',
    display: 'standalone',
    background_color: '#eee',
    description: htmlSlogan,
    lang: htmlLang
  },
  icon: {
    iconSrc: '/static/icon.png',
    sizes: [16, 120, 144, 152, 192, 384, 512]
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
  ],
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
