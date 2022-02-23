/**
 * @file Tags state
 * @module store.tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { firstUpperCase } from '/@/transforms/text'
import { UniversalExtend } from '/@/constants/state'
import nodepress from '/@/services/nodepress'

export type TagMap = Map<string, Tag>
export interface Tag {
  id: number
  _id: string
  name: string
  slug: string
  description: string
  update_at: string
  create_at: string
  extends: UniversalExtend[]
  articles_count: number
}

export const tagEnName = (tag: Tag) => {
  const isChineseName = /.*[\u4e00-\u9fa5]+.*$/.test(tag.name)
  // english name
  if (!isChineseName) {
    return tag.name
  }
  // english words
  if (tag.slug.includes('-')) {
    return tag.slug
  }
  // english word
  return firstUpperCase(tag.slug)
}

export const useTagStore = defineStore('tag', {
  state: () => ({
    fetched: false,
    fetching: false,
    tags: [] as Array<Tag>
  }),
  getters: {
    // sort by count
    sorted: (state) => {
      const tags = [...state.tags]
      tags.sort((a, b) => b.articles_count - a.articles_count)
      return tags
    },
    // 全量标签列表（本身、全小写、全大写、首字母大写）
    fullNameTags: (state): TagMap => {
      const tags = state.tags
      const tagMap: TagMap = new Map()
      tags.forEach((tag) => {
        tagMap.set(tag.name, tag)
        tagMap.set(tag.name.toLowerCase(), tag)
        tagMap.set(tag.name.toUpperCase(), tag)
        tagMap.set(firstUpperCase(tag.name), tag)
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
        .get('/tag/all')
        .then((response) => {
          this.tags = response.result
          this.fetched = true
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
