import { ref, shallowReactive, shallowRef, computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { useZhihuLatestAnswersStore } from '/@/stores/media'
import type { ZhihuAnswerItem, ZhihuAnswersResponse } from '/@/server/getters/zhihu'
import { firstUpperCase } from '/@/transforms/text'
import { Language, LanguageKey } from '/@/language'
import { TunnelModule } from '/@/constants/tunnel'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/app/environment'
import tunnel from '/@/services/tunnel'
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

export const useSnippetsPageData = () => {
  const zhihuLatestAnswers = useZhihuLatestAnswersStore()
  const loading = ref(false)
  const localAnswers = shallowReactive<Array<ZhihuAnswerItem>>([])
  const lastPaging = shallowRef<ZhihuAnswersResponse['paging'] | null>(null)
  const finished = computed(() => lastPaging.value?.is_end ?? zhihuLatestAnswers.data?.paging.is_end ?? false)
  const allAnswers = computed(() => {
    const latestMedias = zhihuLatestAnswers.data?.data ?? []
    return [...latestMedias, ...localAnswers]
  })

  const fetchMoreAnswers = async () => {
    try {
      loading.value = true
      const request = tunnel.dispatch<ZhihuAnswersResponse>(TunnelModule.ZhihuAnswers, {
        page: (lastPaging.value?.current ?? zhihuLatestAnswers.data?.paging?.current ?? 0) + 1
      })
      const response = await (isClient ? delayPromise(360, request) : request)
      localAnswers.push(...response.data)
      lastPaging.value = response.paging
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    finished,
    allAnswers,
    fetchMoreAnswers,
    zhihuLatestAnswers
  }
}
