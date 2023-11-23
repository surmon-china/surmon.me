/**
 * @file Tags state
 * @module store.tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { firstUpperCase } from '/@/transforms/text'
import { getExtendValue } from '/@/transforms/state'
import { Tag } from '/@/interfaces/tag'
import nodepress from '/@/services/nodepress'

export const getTagIconName = (tag: Tag) => {
  return getExtendValue(tag.extends || [], 'icon') || 'icon-tag'
}

export const getTagEnName = (tag: Tag) => {
  // english name
  if (!/.*[\u4e00-\u9fa5]+.*$/.test(tag.name)) {
    return tag.name
  }
  // english words
  if (tag.slug.includes('-')) {
    return tag.slug
  }
  // english word
  return firstUpperCase(tag.slug)
}

export type TagMap = Map<string, Tag>
export const useTagStore = defineStore('tag', () => {
  const fetchStore = createFetchStore<Tag[]>({
    once: true,
    data: [],
    fetcher: async () => {
      const response = await nodepress.get<Tag[]>('/tag/all')
      return response.result
    }
  })

  // order by count
  const sorted = computed(() => {
    const tags = [...fetchStore.data.value]
    tags.sort((a, b) => b.article_count - a.article_count)
    return tags
  })

  // full list of tags (origin/lowercase/uppercase/CamelCase)
  const fullNameTags = computed(() => {
    const tagMap: TagMap = new Map()
    fetchStore.data.value.forEach((tag) => {
      tagMap.set(tag.name, tag)
      tagMap.set(tag.name.toLowerCase(), tag)
      tagMap.set(tag.name.toUpperCase(), tag)
      tagMap.set(firstUpperCase(tag.name), tag)
    })
    return tagMap
  })

  return { ...fetchStore, sorted, fullNameTags }
})
