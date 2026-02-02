import { Language, LocalesKey } from '/@/locales'
import { APP_PROFILE } from '/@/configs/app.config'
import { useEnhancer } from '/@/app/enhancer'
import { usePageSeo } from '/@/composables/head'
import { firstUpperCase } from '/@/transforms/text'
import { getPageURL } from '/@/transforms/url'

export const mobileBannerImageUrl = '/images/page-snippets/banner-mobile.webp'

export const i18nTitle = {
  [Language.Chinese]: '廣行饒益，利樂有情',
  [Language.English]: `${APP_PROFILE.author}'s snippets`
} as const

export const useSnippetsPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer()
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocalesKey.PAGE_SNIPPETS, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LocalesKey.PAGE_SNIPPETS)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `${APP_PROFILE.author} 近期发布的片段` : `${APP_PROFILE.author}'s snippets`
    return {
      pageTitles: titles,
      description: description,
      ogImage: getPageURL(mobileBannerImageUrl),
      ogImageWidth: 1070,
      ogImageHeight: 600
    }
  })
}
