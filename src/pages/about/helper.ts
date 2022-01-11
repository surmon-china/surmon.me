import { useEnhancer } from '/@/app/enhancer'
import { Language } from '/@/language/data'
import { LANGUAGE_KEYS } from '/@/language/key'
import { firstUpperCase } from '/@/transforms/text'
import { getDefaultAvatar } from '/@/transforms/avatar'
import { META } from '/@/config/app.config'

export const getAdminAvatar = (avatar?: string) => {
  return avatar || getDefaultAvatar()
}

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
    [Language.Zh]: `与我合作`,
    [Language.En]: `Hire me`
  },
  myVlogs: {
    [Language.Zh]: `我拍摄的`,
    [Language.En]: `My albums`
  },
  merchBar: {
    [Language.Zh]: `我的周边`,
    [Language.En]: `Merch bar`
  },
  guestbook: {
    [Language.Zh]: `给我留言`,
    [Language.En]: `Guestbook`
  },
  QQGroup: {
    [Language.Zh]: `同性联谊`,
    [Language.En]: `QQ group`
  },
  TelegramGroup: {
    [Language.Zh]: `自由电报`,
    [Language.En]: `TG group`
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
