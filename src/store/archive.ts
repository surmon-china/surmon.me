/**
 * @file Archive state
 * @module store.archive
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'
import { Article } from './article'
import { Category } from './category'
import { Tag } from './tag'

export interface ArchiveState {
  meta: any
  articles: Article[]
  categories: Category[]
  tags: Tag[]
}

export const useArchiveStore = defineStore('archive', {
  state: () => ({
    fetching: false,
    data: null as null | ArchiveState
  }),
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
    }
  }
})
