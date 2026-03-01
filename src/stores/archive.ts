/**
 * @file Archive store
 * @module store/archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { ArticleWithoutContent } from '/@/interfaces/article'
import { dateToHuman, HumanDate } from '/@/transforms/moment'
import nodepress from '/@/services/nodepress'

export type ArchiveTreeList = Array<{
  year: number
  months: Array<{
    month: number
    articles: Array<ArticleWithoutContent & { createAt: HumanDate }>
  }>
}>

export const useArchiveStore = defineStore('archive', () => {
  const store = createFetchStore<ArticleWithoutContent[]>({
    data: [],
    once: true,
    async fetcher() {
      const response = await nodepress.get<ArticleWithoutContent[]>('/articles/all')
      return response.result.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    }
  })

  const tree = computed<ArchiveTreeList>(() => {
    const rootTree: ArchiveTreeList = []

    store.data.value.forEach((article) => {
      // 1. createAt
      const createAt = dateToHuman(new Date(article.created_at))
      const transformedArticle = { ...article, createAt }

      // 2. year
      let targetYear = rootTree.find((ye) => ye.year === createAt.year)
      if (!targetYear) {
        targetYear = { year: createAt.year, months: [] }
        rootTree.push(targetYear)
      }

      // 3. month
      let targetMonth = targetYear.months.find((mo) => mo.month === createAt.month)
      if (!targetMonth) {
        targetMonth = { month: createAt.month, articles: [] }
        targetYear.months.push(targetMonth)
      }

      // 4. article
      targetMonth.articles.push(transformedArticle)
    })

    return rootTree
  })

  return { ...store, tree }
})
