import { I18n } from '/@/services/i18n'
import { LANGUAGE_KEYS } from '/@/language/key'
import { META } from '/@/config/app.config'

export const consoleSlogan = (i18n: I18n) => {
  console.clear()
  console.log(
    `%c${i18n.t(LANGUAGE_KEYS.APP_SLOGAN)} %c${META.email}`,
    `%c${META.email}`,
    'color:#666;font-size:3em;',
    'color:#666;font-size:13px;'
  )
}
