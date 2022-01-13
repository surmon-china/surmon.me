/**
 * @file Archive state
 * @module store.archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { Article } from './article'
import { Category } from './category'
import { Tag } from './tag'
import { dateToHuman, HumanDate } from '/@/transforms/moment'
import nodepress from '/@/services/nodepress'

export interface StatisticState {
  tags: number
  views: number
  articles: number
  comments: number
}

export interface ArchiveState {
  meta: any
  articles: Article[]
  categories: Category[]
  tags: Tag[]
}

export const useArchiveStore = defineStore('archive', {
  state: () => ({
    fetching: false,
    statistic: null as null | StatisticState,
    data: null as null | ArchiveState
  }),
  getters: {
    hydrated: (state) => {
      if (!state.data) {
        return null
      }

      const { articles, tags, categories } = state.data
      const tagMap = new Map(tags.map((tag) => [tag._id, { ...tag, count: 0 }]))
      const categoryMap = new Map(categories.map((cate) => [cate._id, { ...cate, count: 0 }]))
      articles.forEach((article) => {
        ;(article.tag as any as string[]).forEach((t) => {
          if (tagMap.has(t)) {
            tagMap.get(t)!.count++
          }
        })
        ;(article.category as any as string[]).forEach((c) => {
          if (categoryMap.has(c)) {
            categoryMap.get(c)!.count++
          }
        })
      })

      return {
        tags: Array.from(tagMap.values()),
        categories: Array.from(categoryMap.values())
      }
    },
    tree: (state) => {
      const rootTree = [] as Array<{
        year: number
        months: Array<{
          month: number
          articles: Array<Article & { createAt: HumanDate }>
        }>
      }>

      state.data?.articles
        .map((article) => ({
          ...article,
          createAt: dateToHuman(new Date(article.create_at))
        }))
        .sort(({ create_at: a }, { create_at: b }) => {
          return Date.parse(b) - Date.parse(a)
        })
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
    }
  },
  actions: {
    fetchArchive() {
      if (this.data) {
        return Promise.resolve()
      }
      this.fetching = true
      return nodepress
        .get<ArchiveState>('/archive')
        .then((response) => {
          this.data = response.result
        })
        .finally(() => {
          this.fetching = false
        })
    },

    fetchStatistic() {
      if (this.statistic) {
        return Promise.resolve()
      }
      this.fetching = true
      return nodepress
        .get<StatisticState>('/expansion/statistic')
        .then((response) => {
          this.statistic = response.result
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
