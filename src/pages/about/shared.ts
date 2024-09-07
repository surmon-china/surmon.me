import { useStores } from '/@/stores'
import { useEnhancer } from '/@/app/enhancer'
import { useCDNDomain } from '/@/app/context'
import { Language, LanguageKey } from '/@/language'
import { firstUpperCase } from '/@/transforms/text'
import { getAssetURL } from '/@/transforms/url'
import { META } from '/@/config/app.config'

export const useAdminAvatar = (avatar?: string) => {
  return avatar || getAssetURL(useCDNDomain(), '/images/anonymous.png')
}

export const useAboutPageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer()
  const { adminInfo } = useStores()

  return seoMeta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ABOUT, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ABOUT), enTitle] : [enTitle]
    const description = `${isZhLang.value ? '关于' : 'About'} ${META.author}`
    return {
      pageTitle: titles.join(' | '),
      description,
      ogType: 'profile',
      ogImage: adminInfo.data?.avatar
    }
  })
}

export interface AboutI18nConfig {
  [Language.Chinese]: string
  [Language.English]: string
}

export const i18ns = {
  footprint: {
    [Language.Chinese]: '路为纸，地成册，行作笔，心当墨；思无界，行有疆',
    [Language.English]: 'Every path i went astray built up my Rome.'
  },
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
  answers: {
    [Language.Chinese]: '利乐有情',
    [Language.English]: 'Answers'
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
  biography: {
    [Language.Chinese]: [
      `嗨！我是 Surmon，法名觉了（jué liǎo），曾经是一名野生软件工程师，曾在美图秀秀、七牛云、字节跳动、加密交易所工作过。`,
      `如你所见，我有着还不错的设计灵感和编码能力，我经常会开源一些 “没用” 或 “有用” 的小物件，你都可以在 GitHub 找到。`,
      `当然，如果某些输出恰好帮助了你，也期待你的随喜赞助。`,
      `｜`,
      `在不远的未来，我可能会成为一名正式的 <a href="https://en.wikipedia.org/wiki/Theravada" target="_blank">上座部佛教</a> 僧侣。`,
      `我把这里称之为自己的数字 <a href="https://zh.wikipedia.org/wiki/%E7%B2%BE%E8%88%8D" target="_blank">精舍</a>，随缘记录，祝你在这儿玩得愉快！`,
      `（俗生履历参考：<a href="https://surmon.me/article/144" target="_blank">《何以为家》</a>`
    ].join(''),
    [Language.English]: [
      `Hi! I'm Surmon, a software engineer who has worked at Meitu Inc., Qiniu Cloud, ByteDance, and Crypto Exchange.`,
      `I have developed strong design inspiration and coding skills.`,
      `I'm passionate about open-source software and problem-solving, and I hope my contributions can help you.`,
      `I've been a self-taught programmer since 2015, and if you're interested in my journey, you can find the answers in this <a href="https://surmon.me/article/144" target="_blank">article</a> (Chinese).`,
      `I call this place my own digital vihara. Have fun here!`
    ].join(' ')
  }
}
