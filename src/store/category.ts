/**
 * @file Categories state
 * @module store.category
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export interface Category {
  id: number
  _id: string
  pid: string
  name: string
  slug: string
  count: number
  description: string
  update_at: string
  create_at: string
}

export const useCategoryStore = defineStore('category', {
  state: () => ({
    fetched: false,
    fetching: false,
    categories: [] as Array<Category>
  }),
  actions: {
    fetchAll() {
      if (this.fetched) {
        return Promise.resolve()
      }

      this.fetching = true
      return nodepress
        .get('/category', { params: { per_page: 666 } })
        .then((response) => {
          this.categories = response.result.data
          this.fetched = true
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
