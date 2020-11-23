/**
 * @file Site inner link transformer
 * @module transformer/relink
 * @author Surmon <https://github.com/surmon-china>
 */

import { ITagMap } from '/@/store/tag'
import { getTagArchiveRoute } from './route'

export default (text: string, tagMap: ITagMap) => {
  // 构造正则
  const tagNames = Object.keys(tagMap).sort((prev, next) => next.length - prev.length)
  const tagRegexp = eval(`/${tagNames.join('|')}/ig`)

  // 如果是 URL 则不处理
  try {
    new URL(text)
    return text
  } catch (error) {
    return text.replace(tagRegexp, tag => {
      // 从 map 中匹配自身
      const foundTag = tagMap[tag]

      // 找不到，或找到匹配的，但 text 字首为 #，则证明是外站连接，则不解析
      if (!foundTag || text[0] === '#') return tag

      const slug = foundTag.slug
      const path = getTagArchiveRoute(slug)
      const command = `window.$app.config.globalProperties.$router.push({ path: \'${path}\' });return false`
      return `<a href=\"${path}\" title=\"${foundTag.description}\" onclick=\"${command}\">${tag}</a>`
    })
  }
}
