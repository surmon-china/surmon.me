/**
 * @file 文档解析服务 / ES module
 * @module plugins/marked
 * @author Surmon <https://github.com/surmon-china>
 */

import marked from 'marked'
import Hljs from '~/plugins/highlight'
import appConfig from '~/config/app.config'
import buildTagLink from '~/transforms/article-tag-releted-parse'

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
    return Hljs.highlightAuto(code).value
  }
})

const renderer = new marked.Renderer()

// 段落解析
const paragraphRender = text => `<p>${text}</p>`

// 标题解析
const headingRender = (text, level, raw) => {
  const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-');
  return `<h${level} id=${id} alt=${id} title=${id}>${text}</h${level}>`;
}

// 对连接进行权重防流和新窗处理
const linkRender = (href, title, text) => {
  const isSelf = href.includes(appConfig.meta.url)
  const textIsImage = text.includes('<img')
  const linkHtml = `
    <a
      href="${href}"
      target="_blank"
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${title || (textIsImage ? href : text)}"
      ${isSelf ? '' : 'rel="external nofollow noopenter"'}
    >
      ${text}
    </a>
  `
  return linkHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}

// 对图片进行弹窗处理
const imageRender = (src, title, alt) => {
  src = src.replace(/^http:\/\//ig, "/proxy/")
  const imageHtml = `
    <img
      class="lozad"
      data-src="${src}"
      title="${title || alt || appConfig.meta.url}" 
      alt="${alt || title || src}"
      onclick="if (window.utils) window.utils.openImgPopup('${src}')"
    />
  `
  return imageHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}

// 代码解析器（行号处理）
const codeRender = function(code, lang, escaped) {

  if (this.options.highlight) {
    const out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }
  
  const lineNums = code
    .split('\n')
    .map((l, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
    .join('')

  const preHtml = lang
    ? `
      <pre data-lang="${lang}">
        <ul class="code-lines">${lineNums}</ul>
        <code class="${this.options.langPrefix}${escape(lang, true)}">${(escaped ? code : escape(code, true))}\n</code>
      </pre>\n
    `
    : `
      <pre>
        <ul class="code-lines">${lineNums}</ul>
        <code>${(escaped ? code : escape(code, true))}\n</code>
      </pre>
    `
    
  return preHtml
}

renderer.link = linkRender
renderer.code = codeRender
renderer.image = imageRender
renderer.heading = headingRender
renderer.paragraph = paragraphRender

export default (content, tags, parseHtml = false) => {

  // 所有非链接的关键字进行内链处理
  renderer.text = tags && tags.length
    ? text => buildTagLink(text, tags)
    : text => text

  // 如果是解析评论，则不解析 html 内容
  marked.setOptions({ sanitize: !parseHtml })

  if (typeof content !== 'string') {
    return ''
  }

  // 返回解析内容
  return marked(content, { renderer })
}
