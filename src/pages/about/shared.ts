import { useEnhancer } from '/@/app/enhancer'
import { Language, LanguageKey } from '/@/language'
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

export const i18ns = {
  biography: {
    [Language.Chinese]: `本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中`,
    [Language.English]: `Either write something worth reading, do something worth writing.`
  },
  roadmap: {
    [Language.Chinese]: `路为纸，地成册，行作笔，心当墨；思无界，行有疆`,
    [Language.English]: `Every path i went astray built up my Rome.`
  },
  freelancer: {
    [Language.Chinese]: `与我合作`,
    [Language.English]: `Freelancer`
  },
  sponsor: {
    [Language.Chinese]: `向我赞助`,
    [Language.English]: `Sponsor`
  },
  statement: {
    [Language.Chinese]: `众而周知`,
    [Language.English]: `Statement`
  },
  feedback: {
    [Language.Chinese]: `向我反馈`,
    [Language.English]: `Feedback`
  },
  archive: {
    [Language.Chinese]: `笔文存档`,
    [Language.English]: `Archive`
  },
  lens: {
    [Language.Chinese]: `行行摄摄`,
    [Language.English]: `Lens view`
  },
  guestbook: {
    [Language.Chinese]: `给我留言`,
    [Language.English]: `Guestbook`
  },
  merchBar: {
    [Language.Chinese]: `周边好物`,
    [Language.English]: `Merch bar`
  },
  rss: {
    [Language.Chinese]: `长期订阅`,
    [Language.English]: `Subscribe`
  },
  discordGroup: {
    [Language.Chinese]: `国际联谊`,
    [Language.English]: `Discord`
  },
  telegramGroup: {
    [Language.Chinese]: `自由报社`,
    [Language.English]: `TG group`
  },
  livingNow: {
    [Language.Chinese]: `暂居上海，养两条狗`,
    [Language.English]: `Omicron prison, Shanghai`
  }
}

export const useAboutPageMeta = () => {
  const { i18n, meta, isZhLang } = useEnhancer()
  return meta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ABOUT, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ABOUT), enTitle] : [enTitle]
    return {
      pageTitle: titles.join(' | '),
      description: `关于 ${META.author}`
    }
  })
}

export const SPECIAL_LINKS = Object.freeze([
  {
    name: 'GitHub',
    url: 'https://github.com'
  },
  {
    name: `PM2`,
    url: 'https://pm2.keymetrics.io/'
  },
  {
    name: `Vite`,
    url: 'https://vitejs.dev/'
  },
  {
    name: `Disqus`,
    url: 'https://disqus.com/'
  }
])
