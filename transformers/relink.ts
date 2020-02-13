/* eslint-disable no-useless-escape */
/**
 * @file 文章 -> 标签内链关系构造器 / ES module
 * @module transforms/relink
 * @author Surmon <https://github.com/surmon-china>
 */

import { firstUpperCase } from './text'

// TODO: 待迁移
export interface ITag {
  name: string
  slug: string
  description: string
  create_at?: Date
  update_at?: Date
  count?: number
  _id?: string
  extends: $TODO[]
}

export default (text: string, tags: ITag[]) => {
  // 初始化标签数据（本身、全小写、全大写、首字母大写）
  const tagNames = Object.keys(
    tags.reduce((tagNames, { name: tagName }) => {
      const lowerCaseText = tagName.toLowerCase()
      const upperCaseText = tagName.toUpperCase()
      const firstUpperCaseText = firstUpperCase(tagName)
      ;[tagName, lowerCaseText, upperCaseText, firstUpperCaseText].forEach(
        name => {
          !tagNames[name] && (tagNames[name] = null)
        }
      )
      return tagNames
    }, {} as { [key: string]: $TODO })
  ).sort((prev, next) => next.length - prev.length)

  // 构造正则
  const tagRegexp = eval(`/${tagNames.join('|')}/ig`)

  // 如果字符被 tagNames 包含，即字符本身是个单词，即字符本身是连接，则直接返回字符，不再处理
  if (tagNames.includes(text)) {
    return text
  }

  // 正则替换方法
  return text.replace(tagRegexp, tag => {
    // 找到本身为自身、大写为自身、小写为自身、首字母大写为自身
    const findedTag = tags.find(
      ({ name: tagName }) =>
        tagName === tag ||
        tagName.toLowerCase() === tag ||
        tagName.toUpperCase() === tag ||
        firstUpperCase(tagName) === tag
    )

    // 找不到，或找到匹配的，但 text 字首为#，则证明是外站连接，则不解析
    if (!findedTag || text[0] === '#') return tag

    const slug = findedTag.slug
    const command = `window.$nuxt.$router.push({ path: \'/tag/${slug}\' });return false`
    return `<a href=\"/tag/${slug}\" title=\"${findedTag.description}\" onclick=\"${command}\">${tag}</a>`
  })
}
