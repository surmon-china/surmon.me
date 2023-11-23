/**
 * @file Category state
 * @module store.category
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { Category } from '/@/interfaces/category'
import { PaginationList } from '/@/interfaces/common'
import nodepress from '/@/services/nodepress'

export const useCategoryStore = defineStore('category', () => {
  return createFetchStore<Category[]>({
    data: [],
    once: true,
    fetcher() {
      return nodepress
        .get<PaginationList<Category>>('/category', { params: { per_page: 50 } })
        .then((response) => response.result.data)
    }
  })
})
