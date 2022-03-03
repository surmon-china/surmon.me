/**
 * @file I18n language
 * @module language
 * @author Surmon <https://github.com/surmon-china>
 */

import type { I18nLanguage, I18nValueRender } from '/@/composables/i18n'
export { LanguageKey } from './key'
import { LanguageKey } from './key'
import { zhLangMap } from './lang-zh'
import { enLangMap } from './lang-en'

export type LanguageValue = string | I18nValueRender
export type LanguageMap = Record<LanguageKey, LanguageValue>

export enum Language {
  English = 'en',
  Chinese = 'zh'
}

export const languages: I18nLanguage<LanguageKey>[] = [
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
