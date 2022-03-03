/**
 * @file UA parser
 * @module transform.ua
 * @author Surmon <https://github.com/surmon-china>
 */

import parser from 'ua-parser-js'
import { Language } from '/@/language'

export const uaParser = (userAgent: string) => {
  const parseResult = parser(userAgent || '')
  const browserName = String(parseResult.browser.name).toLowerCase()
  const isTargetDevice = (browsers: string[]) => {
    return browsers.some((browser) => browser.toLowerCase() === browserName)
  }

  return {
    result: parseResult,
    isIE: isTargetDevice(['compatible', 'MSIE', 'IE']),
    isEdge: isTargetDevice(['Edge']),
    isFirefox: isTargetDevice(['Firefox']),
    isChrome: isTargetDevice(['Chrome', 'Chromium']),
    isSafari: isTargetDevice(['Safari']),
    isWechat: isTargetDevice(['Wechat']),
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile'
  }
}

const isTargetLanguageUser = (language: UaLanguage, targetLang: string) => {
  if (typeof language === 'string') {
    return language.includes(targetLang)
  }
  if (Array.isArray(language)) {
    return language.some((lang) => lang.includes(targetLang))
  }
  return false
}
export type UaLanguage = string | string[]
export const isEnUser = (language: UaLanguage) => isTargetLanguageUser(language, Language.English)
export const isZhUser = (language: UaLanguage) => {
  return language ? isTargetLanguageUser(language, Language.Chinese) : true
}
