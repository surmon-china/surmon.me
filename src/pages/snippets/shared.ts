import { useEnhancer } from '/@/app/enhancer'
import { usePageSeo } from '/@/composables/head'
import { firstUpperCase } from '/@/transforms/text'
import { Language, LanguageKey } from '/@/language'
import { META } from '/@/configs/app.config'

export const i18nTitle = {
  [Language.Chinese]: '广行饶益，利乐有情',
  [Language.English]: `${META.author}'s snippets`
} as const

export const useSnippetsPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer()
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_SNIPPETS, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_SNIPPETS)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `${META.author} 的清风念` : `${META.author}'s snippets`
    return {
      pageTitles: titles,
      description: description
    }
  })
}
