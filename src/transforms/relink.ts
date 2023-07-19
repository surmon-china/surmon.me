/**
 * @file Site inner link transformer
 * @module transform.relink
 * @author Surmon <https://github.com/surmon-china>
 */

import { TagMap } from '/@/stores/tag'
import { getTagFlowRoute } from './route'

// Since it's impossible to tell if markdown content is a link or not, don't use this feature until the problem is solved
export default (text: string, tagMap: TagMap) => {
  const tagNames = Object.keys(tagMap).sort((prev, next) => next.length - prev.length)
  const tagRegexp = eval(`/${tagNames.join('|')}/ig`)

  try {
    new URL(text)
    return text
  } catch (error) {
    return text.replace(tagRegexp, (tagText) => {
      const foundTag = tagMap.get(tagText)
      if (!foundTag || text[0] === '#') {
        return tagText
      }

      const slug = foundTag.slug
      const path = getTagFlowRoute(slug)
      const command = `window.$app.config.globalProperties.$router.push({ path: \'${path}\' });return false`
      return `<a href=\"${path}\" title=\"${foundTag.description}\" onclick=\"${command}\">${tagText}</a>`
    })
  }
}
