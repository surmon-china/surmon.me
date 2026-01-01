import { Language, LocaleKey } from '/@/locales'
import { APP_META } from '/@/configs/app.config'
import { useEnhancer } from '/@/app/enhancer'
import { usePageSeo } from '/@/composables/head'
import { firstUpperCase } from '/@/transforms/text'

export const i18nTitle = {
  [Language.Chinese]: '廣行饒益，利樂有情',
  [Language.English]: `${APP_META.author}'s snippets`
} as const

export const useSnippetsPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer()
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocaleKey.PAGE_SNIPPETS, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LocaleKey.PAGE_SNIPPETS)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `${APP_META.author} 的清风念` : `${APP_META.author}'s snippets`
    return {
      pageTitles: titles,
      description: description
    }
  })
}
