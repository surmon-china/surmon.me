/**
 * @file Category store
 * @module store/category
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { Category } from '/@/interfaces/category'
import nodepress from '/@/services/nodepress'

export const useCategoryStore = defineStore('category', () => {
  return createFetchStore<Category[]>({
    data: [],
    once: true,
    fetcher() {
      return nodepress.get<Category[]>('/categories/all').then((response) => {
        return response.result
      })
    }
  })
})
