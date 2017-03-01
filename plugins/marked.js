import marked from 'marked'
import Hljs from 'highlight.js'
import buildTagLink from '~utils/article-tag-releted-parse.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return Hljs.highlightAuto(code).value;
  }
})

const renderer = new marked.Renderer()

// 对连接进行权重分散和新窗处理
const linkParse = (href, title, text) => {
  const isSelf = href.includes('surmon.me')
  const textIsImage = text.includes('<img')
  return `<a href="${href}" 
             target="_blank" 
             class="${textIsImage ? 'image-link' : 'link'}"
             title="${title || (textIsImage ? href : text)}" 
             ${isSelf ? '' : 'rel="external nofollow"'}>${text}</a>`
}

// 对图片进行弹窗处理
const imageParse = (src, title, alt) => {
  src = src.replace(/^http:\/\//ig, "/proxy/")
  return `<img src="${src}" 
               title="${title || alt || 'surmon.me'}" 
               alt="${alt || title || src}" 
               onclick="if(window.utils) window.utils.openImgPopup('${src}')"/>`
}

// 代码解析器（行号处理）
const codeParse = function(code, lang, escaped) {
  if (this.options.highlight) {
    const out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }
  const lineNums = code.split('\n').map((l, i) => {
    return `<li class="code-line-number">${i + 1}</li>`
  }).join('')
  if (!lang) {
    return `<pre>
              <ul class="code-lines">${lineNums}</ul>
              <code>${(escaped ? code : escape(code, true))}\n</code>
            </pre>`
  } else {
    return `<pre data-lang="${lang}">
            <ul class="code-lines">${lineNums}</ul>
            <code class="${this.options.langPrefix}${escape(lang, true)}">${(escaped ? code : escape(code, true))}\n</code>
          </pre>\n`
  }
}

renderer.link = linkParse
renderer.code = codeParse
renderer.image = imageParse

export default (content, tags) => {

  // 所有非链接的关键字进行内链处理
  if (tags && tags.length) renderer.text = text => buildTagLink(text, tags)
  return marked(content, { renderer })
}