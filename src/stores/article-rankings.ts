/**
 * @file Article rankings store
 * @module store/article-rankings
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { SortMode } from '/@/constants/sort-param'
import { PaginationList } from '/@/interfaces/pagination'
import { ArticleListItem } from '/@/interfaces/article'
import { APP_CONFIG } from '/@/configs/app.config'
import { ARTICLE_LIST_API_PATH } from './article-list'
import nodepress from '/@/services/nodepress'

const createSpecialArticleListStore = (_params: Record<string, any>) => {
  return createFetchStore<ArticleListItem[]>({
    once: true,
    data: [],
    async fetcher() {
      const params = { ..._params, per_page: APP_CONFIG.desktop_sidebar_article_list_count }
      const response = await nodepress.get<PaginationList<ArticleListItem>>(ARTICLE_LIST_API_PATH, { params })
      return response.result.data
    }
  })
}

export const useLatestArticleListStore = defineStore('latestArticleList', () => {
  return createSpecialArticleListStore({})
})

export const useHottestArticleListStore = defineStore('hottestArticleList', () => {
  return createSpecialArticleListStore({ sort: SortMode.Hottest })
})

export const useFeaturedArticleListStore = defineStore('featuredArticleList', () => {
  return createSpecialArticleListStore({ featured: true })
})
