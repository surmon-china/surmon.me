/**
 * @file Markdown parser
 * @module transformer/markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import marked from 'marked'
import API_CONFIG from '/@/config/api.config'
import { META } from '/@/config/app.config'
import { ITagMap } from '/@/store/tag'
import { LOZAD_CLASS_NAME } from '/@/services/lozad'
import highlight from '/@/services/highlight'
import relink from '/@/transforms/relink'

// global options
marked.setOptions({
  gfm: true,
  sanitize: false,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false,
  highlight(code, language) {
    return highlight.getLanguage(language)
      ? highlight.highlight(language, code).value
      : highlight.highlightAuto(code).value
  }
})

const customRenderer = new marked.Renderer()
// 段落解析
customRenderer.paragraph = text => `<p>${text}</p>`
// 标题解析
customRenderer.heading = (text, level, raw) => {
  const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
  return `<h${level} id=${id} alt=${id} title=${id}>${text}</h${level}>`
}
// 对连接进行权重防流和新窗处理
customRenderer.link = (href, title, text) => {
  const isSelf = href?.includes(META.url)
  const textIsImage = text.includes('<img')
  const linkHtml = `
    <a
      href="${href}"
      target="_blank"
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${title || (textIsImage ? href : text)}"
      ${isSelf ? '' : 'rel="external nofollow noopener"'}
    >
      ${text}
    </a>
  `
  return linkHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}
// Image -> popup
customRenderer.image = (src, title, alt) => {
  // HTTP -> proxy
  const source = src?.replace(/^http:\/\//gi, `${API_CONFIG.PROXY}/`)
  return (`
    <img
      class="${LOZAD_CLASS_NAME}"
      data-src="${source}"
      title="${title || alt || META.url}"
      alt="${alt || title || source}"
      onclick="window.$popup && window.$popup.vImage('${source}')"
    />
  `).replace(/\s+/g, ' ').replace(/\n/g, ' ')
}
// 代码解析器（行号处理）
customRenderer.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    const output = this.options.highlight(code, lang || '')
    if (output != null && output !== code) {
      escaped = true
      code = output
    }
  }

  const lineNumbers = code
    .split('\n')
    .map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
    .join('')

  const readOnlyAttrs = `
    contenteditable="true"
    oncut="return false"
    onpaste="return false"
    onkeydown="if(event.metaKey) return true; return false;"
  `

  return lang
    ? `
      <pre data-lang="${lang}">
        <ul class="code-lines">${lineNumbers}</ul>
        <code
          ${readOnlyAttrs}
          class="${this.options.langPrefix}${escape(lang)}"
        >${escaped ? code : escape(code)}\n</code>
      </pre>\n
    `
    : `
      <pre>
        <ul class="code-lines">${lineNumbers}</ul>
        <code ${readOnlyAttrs}>${escaped ? code : escape(code)}\n</code>
      </pre>
    `
}

export interface IRenderOption {
  tagMap?: ITagMap
  relink?: boolean
  html?: boolean
}

export const markdownToHTML = (markdown: string, options?: IRenderOption) => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  // relink
  customRenderer.text = options?.relink && options?.tagMap
    ? text => relink(text, options.tagMap as ITagMap)
    : text => text

  return marked(markdown, {
    sanitize: !options?.html,
    renderer: customRenderer
  })
}
