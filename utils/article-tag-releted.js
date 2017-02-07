import cheerio from '~plugins/cheerio'

export const buildArticleRelatedTag = (content, tags) => {

  // 初始化标签数据
  const tagNames = tags.map(t => t.name)
  const tagReg = eval(`/${tagNames.join('|')}/ig`)

  // 初始化node-dom环境
  const $ = cheerio.load(content)
  const $content = $().not('pre')[0].children
  // console.log($content)

  // 正则替换方法
  const buildTagLink = string => {
    return string.replace(tagReg, tag => {
      const slug = tags.find(t => Object.is(t.name, tag)).slug
      const command = `window.$nuxt.$router.push({ path: '/tag/${tag}' });return false`
      return `<a href=\"/tag/${slug}\" onclick=\"${command}\">${tag}</a>`
    })
  }

  // 递归遍历所有内容
  const buildTextNode = nodes => {
    nodes.forEach((node, index) => {
      // console.log('node1', node)
      if (!['pre', 'code', 'a'].includes(node.tagName)) {
        if (node.data) {
          $(node).replaceWith(buildTagLink(node.data))
          // console.log('node2', node)
        } else if (node.children && node.children.length) {
          buildTextNode(node.children)
        }
      }
    })
  }

  buildTextNode($content)

  // console.log('text', $.text())
  // console.log('html', $.html())
  return $.html()
}
