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

/*
  TODO: 渲染器问题
  - 数据原则：
    1. 用户输入永远不篡改，不转码，用户输入什么，接口就输出什么
    2. 客户端在渲染 markdown 时进行消毒
  - 目前的问题：
    marked 0.7 要废弃 sanitize 项，导致调用方需要手动对所有的用户产生 html 进行消毒
  - 消毒方案：
    1. 不支持用户输入 html，所以只要让 markdown 不解析 html 就可以了，即对所有 html 标签和符号进行转码
      但问题是，sanitize 严格按照 html 规范来实现对 html 的识别，导致用户输入的不规范数据都无法被有效的 hook 处理；
      比如 <img onerror="test" src="" /> 就会被识别为图片或文本或段落，而不是 html，
      且，sanitize 选项在内部被广泛用于各种 链接、标符的识别，这些工作无法通过覆盖来做到
      模型：markdown string -> marked(hooks:escape(link/img/tag/html/text)) -> html string
    2. 支持用户输入 html，但在最终渲染产出之后，对整体的所有内容进行消毒，比如使用 DOMPurify，排除掉一切所有的用户非法输入，再拿去做渲染
      模型1: markdown string -> marked() -> html string -> DOMPurify -> html string
      模型: markdown string -> DOMPurify -> marked() -> html string
    3. 从 marked 的设计来看，cleanUrl 等方法的处理都会在后期移除，也就是说 markdown 中 [test](javascript:alert('test')) 这样的代码将不再会被默认消毒，
      也就是说，调用者必须要手动处理安全问题，所以看起来方案 2 才是最终的解决方案，
      但 2 会导致用户可操作性太强，如修改 css、定义样式属性、添加视频元素、这些都会引起业务、样式失控,
      但如果用，就要：禁掉大部分属性、标签... 最终发现还是方案 1 不错...
    4. 把方案 2 的消毒挪到第一步一切问题就都解决啦，比如：
        DOMPurify.sanitize('- 123123123\n\n<img class="asdasd" onerror="" />', { ALLOWED_ATTR: [] })
      把消毒后的内容在拿去解析就可以啦... 有一个巨大的缺陷，就是把用户写的 markdown code 也给消毒了...
        DOMPurify.sanitize('- 123123123\n\n```<img class="asdasd" onerror="" />```', { ALLOWED_ATTR: [] })
        -> '- 123123123\n\n`<img>`'
  - 最终结论：
      方案 2 无法实行，无论放在节点 2 还是 4，都会有无法承担的维护成本，放在节点 2 会吧用户输入的 code 进行消毒，放在节点 4 会导致用户可以输入任何前端需渲染的类型。
      最终选定方案 1，使用 escapeHtml 对 text、html、tag 进行 escape，对 link、image 进行 cleanLink
*/

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
