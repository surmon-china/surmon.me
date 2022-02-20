import { useEnhancer } from '/@/app/enhancer'
import { Language, LanguageKey } from '/@/language'
import { I18nLanguageMap } from '/@/services/i18n'
import { firstUpperCase } from '/@/transforms/text'
import { getDefaultAvatar } from '/@/transforms/avatar'
import { META } from '/@/config/app.config'

export const getAdminAvatar = (avatar?: string) => {
  return avatar || getDefaultAvatar()
}

export interface AboutI18nConfig {
  [Language.Chinese]: string
  [Language.English]: string
}

export const i18ns: { [key: string]: I18nLanguageMap<Language> } = {
  biography: {
    [Language.Chinese]: `本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中`,
    [Language.English]: `Either write something worth reading, Do something worth writing.`
  },
  roadmap: {
    [Language.Chinese]: `路为纸，地成册，行作笔，心当墨；思无界，行有疆`,
    [Language.English]: `Every path I went astray built up my Rome.`
  },
  findJob: {
    [Language.Chinese]: `找我内推`,
    [Language.English]: `Find job`
  },
  hireMe: {
    [Language.Chinese]: `与我合作`,
    [Language.English]: `Hire me`
  },
  myArchive: {
    [Language.Chinese]: `我的创作`,
    [Language.English]: `My articles`
  },
  myVlogs: {
    [Language.Chinese]: `我的行摄`,
    [Language.English]: `My albums`
  },
  merchBar: {
    [Language.Chinese]: `我的周边`,
    [Language.English]: `Merch bar`
  },
  guestbook: {
    [Language.Chinese]: `给我留言`,
    [Language.English]: `Guestbook`
  },
  QQGroup: {
    [Language.Chinese]: `同性联谊`,
    [Language.English]: `QQ group`
  },
  TelegramGroup: {
    [Language.Chinese]: `自由报社`,
    [Language.English]: `TG group`
  }
}

export const useAboutPageMeta = () => {
  const { i18n, meta, isZhLang } = useEnhancer()
  return meta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ABOUT, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ABOUT), enTitle] : [enTitle]
    return { pageTitle: titles.join(' | '), description: `关于 ${META.author}` }
  })
}
