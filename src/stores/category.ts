/**
 * @file Category state
 * @module store.category
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import { UniversalKeyValue } from '/@/constants/state'
import nodepress from '/@/services/nodepress'

export interface Category {
  id: number
  _id: string
  pid: string
  name: string
  slug: string
  description: string
  update_at: string
  create_at: string
  extends: UniversalKeyValue[]
  articles_count: number
}

export const useCategoryStore = defineFetchStore({
  id: 'category',
  initData: [] as Array<Category>,
  onlyOnce: true,
  async fetcher() {
    const response = await nodepress.get('/category', { params: { per_page: 50 } })
    return response.result.data as Array<Category>
  }
})
