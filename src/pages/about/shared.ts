import { useStores } from '/@/stores'
import { useEnhancer } from '/@/app/enhancer'
import { useCdnDomain } from '/@/app/context'
import { usePageSeo } from '/@/composables/head'
import { Language, LocalesKey } from '/@/locales'
import { firstUpperCase } from '/@/transforms/text'
import { getAssetURL } from '/@/transforms/url'
import { APP_PROFILE } from '/@/configs/app.config'

export const useAdminAvatar = (avatar?: string) => {
  return avatar || getAssetURL(useCdnDomain(), '/images/anonymous.png')
}

export const useAboutPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer()
  const { adminProfileStore } = useStores()

  return usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocalesKey.PAGE_ABOUT, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LocalesKey.PAGE_ABOUT)!, enTitle] : [enTitle]
    const description = `${isZhLang.value ? '关于' : 'About'} ${APP_PROFILE.author}`
    return {
      pageTitles: titles,
      description,
      ogType: 'profile',
      ogImage: adminProfileStore.data?.avatar
    }
  })
}

export interface AboutPageI18nConfig {
  [Language.Chinese]: string
  [Language.English]: string
}

export const i18ns = {
  sponsor: {
    [Language.Chinese]: '随喜赞助',
    [Language.English]: 'Sponsor'
  },
  statement: {
    [Language.Chinese]: '众而周知',
    [Language.English]: 'Statement'
  },
  feedback: {
    [Language.Chinese]: '向我反馈',
    [Language.English]: 'Feedback'
  },
  archive: {
    [Language.Chinese]: '笔文存档',
    [Language.English]: 'Archive'
  },
  photography: {
    [Language.Chinese]: '行行摄摄',
    [Language.English]: 'PhotoGram'
  },
  guestbook: {
    [Language.Chinese]: '给我留言',
    [Language.English]: 'Guestbook'
  },
  snippets: {
    [Language.Chinese]: '利乐有情',
    [Language.English]: 'Snippets'
  },
  nft: {
    [Language.Chinese]: '数字藏品',
    [Language.English]: 'NFTs'
  },
  rss: {
    [Language.Chinese]: '长期订阅',
    [Language.English]: 'Subscribe'
  },
  discordGroup: {
    [Language.Chinese]: '国际联谊',
    [Language.English]: 'Discord'
  },
  telegramGroup: {
    [Language.Chinese]: '自由报社',
    [Language.English]: 'TG Group'
  },
  footprintTitle: {
    [Language.Chinese]: '行脚所至',
    [Language.English]: 'On the Way'
  },
  footprintDescription: {
    [Language.Chinese]: '路为纸，地成册；思无界，行有疆',
    [Language.English]: 'Not arrival, but passing through.'
  }
}
