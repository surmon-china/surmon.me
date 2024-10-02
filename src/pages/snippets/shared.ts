import { useEnhancer } from '/@/app/enhancer'
import { firstUpperCase } from '/@/transforms/text'
import { Language, LanguageKey } from '/@/language'
import { META } from '/@/config/app.config'

export const i18nTitle = {
  [Language.Chinese]: '广行饶益，利乐有情',
  [Language.English]: `${META.author}'s snippets`
} as const

export const useSnippetsPageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer()
  seoMeta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_SNIPPETS, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_SNIPPETS), enTitle] : [enTitle]
    const description = isZhLang.value ? `${META.author} 的清净念` : `${META.author}'s snippets`
    return {
      pageTitle: titles.join(' | '),
      description: description
    }
  })
}
