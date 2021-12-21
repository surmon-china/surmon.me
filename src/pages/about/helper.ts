import { useEnhancer } from '/@/app/enhancer'
import { Language } from '/@/language/data'
import { LANGUAGE_KEYS } from '/@/language/key'
import { firstUpperCase } from '/@/transforms/text'
import { META } from '/@/config/app.config'

export interface AboutI18nConfig {
  [Language.Zh]: string
  [Language.En]: string
}

export const i18ns = {
  biography: {
    [Language.Zh]: `本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中`,
    [Language.En]: `Either write something worth reading, Do something worth writing.`
  },
  roadmap: {
    [Language.Zh]: `路为纸，地成册，行作笔，心当墨；思无界，行有疆`,
    [Language.En]: `Every path I went astray built up my Rome.`
  },
  findJob: {
    [Language.Zh]: `找我内推`,
    [Language.En]: `Find job`
  },
  hireMe: {
    [Language.Zh]: `找我干活`,
    [Language.En]: `Hire me`
  },
  followMe: {
    [Language.Zh]: `关注我的 Vlog`,
    [Language.En]: `Follow me`
  },
  merchBar: {
    [Language.Zh]: `体验我的周边`,
    [Language.En]: `Merch bar`
  },
  QQGroup: {
    [Language.Zh]: `寂寞同性交友群`,
    [Language.En]: `Join QQ group`
  },
  TelegramGroup: {
    [Language.Zh]: `加入电报群`,
    [Language.En]: `Telegram group`
  }
}

export const useAboutPageMeta = () => {
  const { i18n, meta, isZhLang } = useEnhancer()
  return meta(() => {
    const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_ABOUT, Language.En)!)
    const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_ABOUT), enTitle] : [enTitle]
    return { pageTitle: titles.join(' | '), description: `关于 ${META.author}` }
  })
}
