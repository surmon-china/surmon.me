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

export default {
  loading: {
    color: appConfig.color.primary
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
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
  }
}
