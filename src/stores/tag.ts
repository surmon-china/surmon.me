/**
 * @file Tags state
 * @module store.tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import { firstUpperCase } from '/@/transforms/text'
import { UniversalKeyValue } from '/@/constants/state'
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
  extends: UniversalKeyValue[]
  articles_count: number
}

export const tagEnName = (tag: Tag) => {
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

export const useTagStore = defineFetchStore({
  id: 'tag',
  initData: [] as Array<Tag>,
  onlyOnce: true,
  fetcher: () => nodepress.get<Array<Tag>>('/tag/all').then((response) => response.result),
  getters: {
    // sort by count
    sorted: (state) => {
      const tags = [...state.data]
      tags.sort((a, b) => b.articles_count - a.articles_count)
      return tags
    },
    // 全量标签列表（本身、全小写、全大写、首字母大写）
    fullNameTags: (state): TagMap => {
      const tagMap: TagMap = new Map()
      state.data.forEach((tag) => {
        tagMap.set(tag.name, tag)
        tagMap.set(tag.name.toLowerCase(), tag)
        tagMap.set(tag.name.toUpperCase(), tag)
        tagMap.set(firstUpperCase(tag.name), tag)
      })
      return tagMap
    }
  }
})
