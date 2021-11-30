/**
 * @file Tags state
 * @module store.tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'
import { firstUpperCase } from '/@/transforms/text'

export interface Tag {
  id: number
  _id: string
  name: string
  slug: string
  count: number
  description: string
  update_at: string
  create_at: string
  extends: $TODO[]
}

export const useTagStore = defineStore('tag', {
  state: () => ({
    fetched: false,
    fetching: false,
    tags: [] as Array<Tag>
  }),
  getters: {
    // 全量标签列表（本身、全小写、全大写、首字母大写）
    fullNameTags: (state) => {
      const tags = state.tags
      const tagMap: { [key: string]: Tag } = {}
      tags.forEach((tag) => {
        ;[
          tag.name,
          tag.name.toLowerCase(),
          tag.name.toUpperCase(),
          firstUpperCase(tag.name)
        ].forEach((tagName) => {
          tagMap[tagName] = tag
        })
      })
      return tagMap
    }
  },
  actions: {
    fetchAll() {
      if (this.fetched) {
        return Promise.resolve()
      }

      this.fetching = true
      return nodepress
        .get('/tag', { params: { cache: 1 } })
        .then((response) => {
          this.tags = response.result.data
          this.fetched = true
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
