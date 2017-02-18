import cheerio from '~plugins/cheerio'

const buildArticleRelatedTag = (content, tags) => {

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
  const tagReg = eval(`/${tagNames.join('|')}/ig`)

  // 初始化node-dom环境
  const $ = cheerio.load(content, { decodeEntities: false })
  const $content = $().not('pre')[0].children

  // 正则替换方法
  const buildTagLink = string => {
    return string.replace(tagReg, tag => {
      // 找到本身为自身、大写为自身、小写为自身、首字母大写为自身
      const findedTag = tags.find(t => {
        return Object.is(t.name, tag) || 
               Object.is(t.name.toLowerCase(), tag) || 
               Object.is(t.name.toUpperCase(), tag) || 
               Object.is(firstUpperCase(t.name), tag)
      })
      if (!findedTag) return tag
      const slug = findedTag.slug
      const command = `window.$nuxt.$router.push({ path: \'/tag/${slug}\' });return false`
      return `<a href=\"/tag/${slug}\" onclick=\"${command}\">${tag}</a>`
    })
  }

  // 递归遍历所有本身及子级内容
  const buildTextNode = nodes => {
    nodes.forEach((node, index) => {
      if (!['pre', 'code', 'a'].includes(node.tagName)) {
        // 处理图片
        if (Object.is(node.tagName, 'img') && node.attribs && node.attribs.src) {
          $(node).attr('onclick', `window.utils.openImgPopup(\'${node.attribs.src}\')`)
        }
        // 处理标签关系
        if (node.data) {
          $(node).replaceWith(buildTagLink(node.data))
        } else if (node.children && node.children.length) {
          buildTextNode(node.children)
        }
      }
    })
  }

  buildTextNode($content)
  return $.html()
}

export default buildArticleRelatedTag
