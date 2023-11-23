/**
 * @file Archive state
 * @module store.archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { Archive } from '/@/interfaces/archive'
import { Article } from '/@/interfaces/article'
import { dateToHuman, HumanDate } from '/@/transforms/moment'
import nodepress from '/@/services/nodepress'

export type ArchiveTreeList = Array<{
  year: number
  months: Array<{
    month: number
    articles: Array<Article & { createAt: HumanDate }>
  }>
}>

export const useArchiveStore = defineStore('archive', () => {
  const fetchStore = createFetchStore<Archive | null>({
    data: null,
    once: true,
    async fetcher() {
      const response = await nodepress.get<Archive>('/archive')
      return response.result
    }
  })

  const tree = computed<ArchiveTreeList>(() => {
    const rootTree: ArchiveTreeList = []
    fetchStore.data.value?.articles
      .sort(({ created_at: a }, { created_at: b }) => {
        return Date.parse(b) - Date.parse(a)
      })
      .map((article) => ({
        ...article,
        createAt: dateToHuman(new Date(article.created_at))
      }))
      .forEach((article) => {
        const { createAt } = article
        // year
        const yearTree = rootTree.find((ye) => ye.year === createAt.year)
        let targetYear = yearTree
        if (!targetYear) {
          targetYear = { year: createAt.year, months: [] }
          rootTree.push(targetYear)
        }
        // month
        const monthTree = targetYear.months.find((mo) => mo.month === createAt.month)
        let targetMonth = monthTree
        if (!targetMonth) {
          targetMonth = { month: createAt.month, articles: [] }
          targetYear.months.push(targetMonth)
        }
        // article
        targetMonth.articles.push(article)
      })
    return rootTree
  })

  return {
    ...fetchStore,
    tree
  }
})
