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

export interface Archive {
  articles: Article[]
  categories: Category[]
  tags: Tag[]
}

export const useArchiveStore = defineStore('archive', {
  state: () => ({
    fetching: false,
    archive: null as null | Archive
  }),
  getters: {
    hydrated: (state) => {
      if (!state.archive) {
        return null
      }

      const { articles, tags, categories } = state.archive
      const tagMap = new Map<string, Tag>(
        tags.map((tag) => [tag._id, { ...tag, articles_count: 0 }])
      )
      const categoryMap = new Map<string, Category>(
        categories.map((category) => [category._id, { ...category, articles_count: 0 }])
      )
      articles.forEach((article) => {
        ;(article.tag as any as string[]).forEach((t) => {
          if (tagMap.has(t)) {
            tagMap.get(t)!.articles_count++
          }
        })
        ;(article.category as any as string[]).forEach((c) => {
          if (categoryMap.has(c)) {
            categoryMap.get(c)!.articles_count++
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

      state.archive?.articles
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
      if (this.archive) {
        return Promise.resolve()
      }
      this.fetching = true
      return nodepress
        .get<Archive>('/archive')
        .then((response) => {
          this.archive = response.result
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
