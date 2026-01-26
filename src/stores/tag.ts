/**
 * @file Tags state
 * @module store/tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { firstUpperCase } from '/@/transforms/text'
import { Tag } from '/@/interfaces/tag'
import nodepress from '/@/services/nodepress'

export const getTagIconName = (tagExtras: Tag['extras'] | undefined) => {
  return tagExtras?.find(({ key }) => key === 'icon-name')?.value ?? 'icon-tag'
}

export const getTagEnName = (tag: Tag) => {
  // tag extras custom en-name
  const tagEnName = tag.extras.find(({ key }) => key === 'en-name')
  if (tagEnName) {
    return tagEnName.value
  }
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
  // const fullNamesTagsMap = computed(() => {
  //   const map = new Map<string, Tag>()
  //   fetchStore.data.value.forEach((tag) => {
  //     map.set(tag.name, tag)
  //     map.set(tag.name.toLowerCase(), tag)
  //     map.set(tag.name.toUpperCase(), tag)
  //     map.set(firstUpperCase(tag.name), tag)
  //   })
  //   return map
  // })

  return { ...fetchStore, sorted }
})
