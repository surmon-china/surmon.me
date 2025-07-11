/**
 * @file UA parser
 * @module transform/ua
 * @author Surmon <https://github.com/surmon-china>
 */

import { UAParser } from 'ua-parser-js'
import { Language } from '/@/locales'

export const uaParser = (userAgent: string) => {
  const parsed = UAParser(userAgent || '')
  const browserName = String(parsed.browser.name).toLowerCase()
  const isBrowserMatched = (browsers: string[]) => {
    return browsers.some((browser) => browser.toLowerCase() === browserName)
  }

  return {
    uap: parsed,
    isIE: isBrowserMatched(['compatible', 'MSIE', 'IE', 'IEMobile']),
    isEdge: isBrowserMatched(['Edge']),
    isFirefox: isBrowserMatched(['Firefox']),
    isChrome: isBrowserMatched(['Chrome', 'Chromium']),
    isSafari: isBrowserMatched(['Safari']),
    isWechat: isBrowserMatched(['Wechat']),
    isIos: parsed.os.is('iOS'),
    isAndroid: parsed.os.is('Android'),
    isMobile: parsed.device.is('mobile')
  }
}

type UaLanguageInput = string | string[]
const isTargetLanguageUser = (language: UaLanguageInput, targetLang: string) => {
  if (typeof language === 'string') {
    return language.includes(targetLang)
  }
  if (Array.isArray(language)) {
    return language.some((lang) => lang.includes(targetLang))
  }
  return false
}

export const isEnUser = (language: UaLanguageInput) => {
  return isTargetLanguageUser(language, Language.English)
}

export const isZhUser = (language: UaLanguageInput) => {
  // default to true if no language is provided
  return Array.isArray(language)
    ? language.length
      ? isTargetLanguageUser(language, Language.Chinese)
      : true
    : language
      ? isTargetLanguageUser(language, Language.Chinese)
      : true
}
