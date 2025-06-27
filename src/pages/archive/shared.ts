import { computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { usePageSeo } from '/@/composables/head'
import { useNodepressStatisticStore } from '/@/stores/statistic'
import { numberSplit, numberToKilo, firstUpperCase } from '/@/transforms/text'
import { Language, LanguageKey } from '/@/language'
import { META } from '/@/configs/app.config'

export const i18ns = {
  title: {
    [Language.Chinese]: '出入平等，了了分明',
    [Language.English]: `Surmon's writing archive`
  },
  description: {
    [Language.Chinese]: `书字字之方便，开众善之法门`,
    [Language.English]: 'Either write something worth reading or do something worth writing'
  }
} as const

export const useArchivePageMeta = () => {
  const { i18n, isZhLang } = useEnhancer()
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ARCHIVE, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ARCHIVE)!, enTitle] : [enTitle]
    return {
      pageTitles: titles,
      description: `${META.title} ${isZhLang.value ? '数据归档' : 'archives'}`
    }
  })
}

export const useArchivePageStatistics = () => {
  const { i18n } = useEnhancer()
  const store = useNodepressStatisticStore()
  const statistics = computed(() => ({
    tags: {
      icon: 'icon-tag',
      label: i18n.t(LanguageKey.STATISTIC_TAGS)!,
      value: numberSplit(store.data?.tags || 0)
    },
    articles: {
      icon: 'icon-quill',
      label: i18n.t(LanguageKey.STATISTIC_ARTICLES)!,
      value: numberSplit(store.data?.articles || 0)
    },
    comments: {
      icon: 'icon-comment',
      label: i18n.t(LanguageKey.STATISTIC_COMMENTS)!,
      value: numberSplit(store.data?.comments || 0)
    },
    todayViews: {
      icon: 'icon-eye',
      label: i18n.t(LanguageKey.STATISTIC_TODAY_VIEWS)!,
      value: numberSplit(store.data?.todayViews || 0)
    },
    totalViews: {
      icon: 'icon-eye',
      label: i18n.t(LanguageKey.STATISTIC_TOTAL_VIEWS)!,
      value: numberToKilo(store.data?.totalViews || 0)
    },
    totalLikes: {
      icon: 'icon-like',
      label: i18n.t(LanguageKey.STATISTIC_TOTAL_UPVOTES)!,
      value: numberSplit(store.data?.totalLikes || 0)
    },
    averageEmotion: {
      icon: 'icon-emoji',
      label: i18n.t(LanguageKey.STATISTIC_AVERAGE_EMOTION)!,
      value: String(store.data?.averageEmotion ?? '-')
    }
  }))

  return {
    statistics,
    fetch: store.fetch
  }
}
