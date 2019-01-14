/**
 * @file 文章 -> 标签内链关系构造器 / ES module
 * @module transforms/article-tag-releted-parse
 * @author Surmon <https://github.com/surmon-china>
 */

export default (text, tags) => {

  // 首字母大写
  const toFirstUpperCase = string => {
    return string.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  }

  // 初始化标签数据（本身、全小写、全大写、首字母大写）
  const tagNames = Object.keys(tags.reduce((tagNames, { name: tagName }, index) => {
    const lowerCase = tagName.toLowerCase()
    const upperCase = tagName.toUpperCase()
    const firstUpperCase = toFirstUpperCase(tagName)
    ;[tagName, lowerCase, upperCase, firstUpperCase].forEach(name => {
      !tagNames[name] && (tagNames[name] = null)
    })
    return tagNames
  }, {})).sort((prev, next) => prev.length < next.length)

  // 构造正则
  const tagRegexp = eval(`/${tagNames.join('|')}/ig`)

  // 如果字符被 tagNames 包含，即字符本身是个单词，即字符本身是连接，则直接返回字符，不再处理
  if (tagNames.includes(text)) {
    return text
  }

  // 正则替换方法
  return text.replace(tagRegexp, tag => {

    // 找到本身为自身、大写为自身、小写为自身、首字母大写为自身
    const findedTag = tags.find(t =>
      Object.is(t.name, tag) ||
      Object.is(t.name.toLowerCase(), tag) ||
      Object.is(t.name.toUpperCase(), tag) ||
      Object.is(toFirstUpperCase(t.name), tag)
    )

    // 找不到，或找到匹配的，但 text 字首为#，则证明是外站连接，则不解析
    if (!findedTag || text[0] === '#') return tag

    const slug = findedTag.slug
    const command = `window.$nuxt.$router.push({ path: \'/tag/${slug}\' });return false`
    return `<a href=\"/tag/${slug}\" title=\"${findedTag.description}\" onclick=\"${command}\">${tag}</a>`
  })
}
