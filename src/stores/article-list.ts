/**
 * @file Article list store
 * @module store/article-list
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, shallowRef, shallowReactive, computed } from 'vue'
import { Pagination, PaginationList } from '/@/interfaces/pagination'
import { Article } from '/@/interfaces/article'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/configs/app.env'
import nodepress from '/@/services/nodepress'

export const ARTICLE_LIST_API_PATH = '/articles'

export interface ArticleListParams {
  tag_slug?: string
  category_slug?: string
  keyword?: string
  page?: number
  per_page?: number
  [key: string]: any
}

export const useArticleListStore = defineStore('articleList', () => {
  const fetching = ref(false)
  const data = shallowReactive<Article[]>([])
  const pagination = shallowRef<Pagination | null>(null)

  // Request identifier for concurrency control
  let fetchId = 0

  const hasMore = computed(() => {
    return pagination.value ? pagination.value.current_page < pagination.value.total_page : false
  })

  const clear = () => {
    data.length = 0
    pagination.value = null
  }

  const _fetch = async (params: ArticleListParams = {}) => {
    const currentFetchId = ++fetchId
    fetching.value = true
    try {
      const request = nodepress.get<PaginationList<Article>>(ARTICLE_LIST_API_PATH, { params })
      const response = await (isClient ? delayPromise(460, request) : request)
      // Only return data if the current request is the most recent one
      // Return null if it's not the latest request, indicating it has been canceled/ignored
      if (currentFetchId === fetchId) {
        data.push(...response.result.data)
        pagination.value = response.result.pagination
      }
    } finally {
      if (currentFetchId === fetchId) {
        fetching.value = false
      }
    }
  }

  const fetch = (params: ArticleListParams = {}) => {
    clear()
    return _fetch(params)
  }

  const fetchNextPage = (params: ArticleListParams = {}) => {
    if (!pagination.value) {
      const message = 'No pagination data available.'
      console.warn(`[ArticleListStore] fetchMore: ${message} Please call fetch() first.`)
      return Promise.reject(message)
    }
    if (!hasMore.value) {
      const message = 'No more data to load.'
      console.warn(`[ArticleListStore] fetchMore: ${message}`)
      return Promise.reject(message)
    }

    return _fetch({ ...params, page: pagination.value.current_page + 1 })
  }

  return {
    fetching,
    pagination,
    data,
    hasMore,
    clear,
    fetch,
    fetchNextPage
  }
})
