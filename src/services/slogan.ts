/**
 * @file Slogan consoler
 * @module service.slogan
 * @author Surmon <https://github.com/surmon-china>
 */

import { I18n } from '/@/services/i18n'
import { LANGUAGE_KEYS } from '/@/language/key'

export const consoleSlogan = (i18n: I18n, email?: string) => {
  console.clear()
  console.log(
    `%c${i18n.t(LANGUAGE_KEYS.APP_SLOGAN)} %c${email || ''}`,
    'color:#666;font-size:3em;',
    'color:#666;font-size:13px;'
  )
}
