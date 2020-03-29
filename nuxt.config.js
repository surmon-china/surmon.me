/**
 * @file Nuxt config / Hybrid module
 * @module nuxt.config
 * @author Surmon <https://github.com/surmon-china>
 */

import appConfig from './config/app.config'
import apiConfig from './config/api.config'
import i18nConfig from './config/i18n.config'
import systemConstants from './constants/system'
import { isProdMode, isDevMode } from './environment'

const htmlLang = i18nConfig.default || systemConstants.Language.Zh
const htmlSlogan = i18nConfig.data.text.slogan[htmlLang]
const SCSS_VARIABLES_PRODUCTION = isProdMode ? ['~assets/styles/production.scss'] : []

export default {
  mode: 'universal',
  modern: true,
  dev: isDevMode,
  env: {
    BASE: apiConfig.BASE,
    HOST_URL: apiConfig.SOCKET
  },
  loading: {
    color: appConfig.color.primary
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  buildModules: [
    '@nuxt/typescript-build'
  ],
  build: {
    analyze: process.argv.join('').includes('analyze'),
    maxChunkSize: 360000,
    extractCSS: true,
    publicPath: apiConfig.CDN + '/_nuxt/',
    optimization: {
      splitChunks: {
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
  plugins: [
    '~/plugins/composition-api',
    { src: '~/plugins/polyfill', mode: 'client' },
    { src: '~/plugins/loaded-task' },
    { src: '~/plugins/extend' },
    { src: '~/plugins/marked' },
    { src: '~/plugins/highlight' },
    { src: '~/plugins/lozad', mode: 'client' },
    { src: '~/plugins/favico', mode: 'client' },
    { src: '~/plugins/adsense', mode: 'client' },
    { src: '~/plugins/swiper', mode: 'client' },
    { src: '~/plugins/analytics', mode: 'client' },
    { src: '~/plugins/emoji-233333', mode: 'client' },
    { src: '~/plugins/copy-right', mode: 'client' },
    { src: '~/plugins/popup', mode: 'client' },
    { src: '~/plugins/amplitude', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/component-cache',
    ['@nuxtjs/axios', { baseURL: apiConfig.BASE }]
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
      { rel: 'dns-prefetch', href: '//at.alicdn.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//googleads.g.doubleclick.net' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'dns-prefetch', href: '//tpc.googlesyndication.com' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
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
    linkActiveClass: 'link-active'
  },
  css: [
    'highlight.js/styles/ocean.css',
    'swiper/css/swiper.css',
    ...SCSS_VARIABLES_PRODUCTION,
    '~assets/styles/app.scss'
  ],
  styleResources: {
    scss: [
      ...SCSS_VARIABLES_PRODUCTION,
      '~/assets/styles/init.scss'
    ]
  }
}
