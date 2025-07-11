/**
 * @file I18n locale
 * @module locale
 * @author Surmon <https://github.com/surmon-china>
 */

import type { I18nLocale, I18nValueRender } from '/@/composables/i18n'
export { LocaleKey } from './key'
import { LocaleKey } from './key'
import { zhLangMap } from './lang-zh'
import { enLangMap } from './lang-en'

export type LocaleValue = string | I18nValueRender
export type LocaleMap = Record<LocaleKey, LocaleValue>

export enum Language {
  English = 'en',
  Chinese = 'zh'
}

export const locales: I18nLocale<LocaleKey>[] = [
  {
    code: Language.Chinese,
    iso: 'zh-CN',
    name: '简体中文',
    data: zhLangMap
  },
  {
    code: Language.English,
    iso: 'en-US',
    name: 'English',
    data: enLangMap
  }
]
