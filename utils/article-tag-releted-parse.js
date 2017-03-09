/*
*
* 文章-标签内链关系构造器
*
*/

export default (text, tags) => {

  // 首字母大写
  const firstUpperCase = str => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  }

  // 初始化标签数据（本身、全小写、全大写、首字母大写）
  const selfTags = tags.map(t => t.name)
  const lowerCaseTags = tags.map(t => t.name.toLowerCase())
  const upperCaseTags = tags.map(t => t.name.toUpperCase())
  const firstUpperCaseTags = tags.map(t => firstUpperCase(t.name))

  // 构造正则
  const tagNames = Array.from(new Set([...selfTags, ...lowerCaseTags, ...upperCaseTags, ...firstUpperCaseTags]))
  tagNames.sort((p, n) => p.length < n.length)
  const tagReg = eval(`/${tagNames.join('|')}/ig`)

  // 如果字符被tagNames包含，即字符本身是个单词，即字符本身是连接，则直接返回字符，不再处理
  if (tagNames.includes(text)) {
    return text
  }

  // 正则替换方法
  return text.replace(tagReg, tag => {
    // 找到本身为自身、大写为自身、小写为自身、首字母大写为自身
    const findedTag = tags.find(t => {
      return Object.is(t.name, tag) || 
             Object.is(t.name.toLowerCase(), tag) || 
             Object.is(t.name.toUpperCase(), tag) || 
             Object.is(firstUpperCase(t.name), tag)
    })
    if (!findedTag) return tag
    // 如果找到匹配的，但是text文字首字符为#，则证明是外站连接，则不解析
    if (Object.is(text[0], '#'))  return tag
    const slug = findedTag.slug
    const command = `window.$nuxt.$router.push({ path: \'/tag/${slug}\' });return false`
    return `<a href=\"/tag/${slug}\" title=\"${findedTag.description}\" onclick=\"${command}\">${tag}</a>`
  })
}
