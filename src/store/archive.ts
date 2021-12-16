/**
 * @file Archive state
 * @module store.archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { Article } from './article'
import { Category } from './category'
import { Tag } from './tag'
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
