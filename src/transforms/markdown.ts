/**
 * @file Markdown parser
 * @module transformer/markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import DOMPurify from 'dompurify'
import escapeHTML from 'escape-html'
import { marked, Renderer } from 'marked'
import { TagMap } from '/@/store/tag'
import { LOZAD_CLASS_NAME } from '/@/services/lozad'
import highlight from '/@/services/highlight'
import relink from '/@/transforms/relink'
import { META } from '/@/config/app.config'
import API_CONFIG from '/@/config/api.config'

const trimHTML = (html: string) => html.replace(/\s+/g, ' ').replace(/\n/g, ' ')
interface RendererGetterOption {
  sanitize: boolean
  text: (text: string) => string
  headingID: (text: string, level: number, raw: string) => string
}
const getRenderer = (options?: Partial<RendererGetterOption>) => {
  const renderer = new Renderer()

  // text
  renderer.text = (text) => {
    return options?.text ? options.text(text) : text
  }

  // html: escape > sanitize
  renderer.html = (html) => {
    return options?.sanitize ? DOMPurify.sanitize(escapeHTML(html)) : html
  }

  // heading
  renderer.heading = (text, level, raw) => {
    const idText = options?.headingID ? `id=${options.headingID(text, level, raw)}` : ''
    return `<h${level} ${idText} alt=${text} title=${text}>${text}</h${level}>`
  }

  // paragraph
  renderer.paragraph = (text) => `<p>${text}</p>`

  // checkbox
  renderer.checkbox = (checked) => {
    return checked
      ? `<i class="checkbox checked iconfont icon-checkbox-selected"></i>`
      : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`
  }

  // link: sanitize
  renderer.link = (href, title, text) => {
    const isSelf = href?.includes(META.url)
    const textIsImage = text.includes('<img')
    const linkHTML = trimHTML(`
      <a
        href="${href}"
        target="_blank"
        class="${textIsImage ? 'image-link' : 'link'}"
        title="${title || (textIsImage ? href : text)}"
        ${isSelf ? '' : 'rel="external nofollow noopener"'}
      >
        ${text}
      </a>
    `)

    return !options?.sanitize
      ? linkHTML
      : DOMPurify.sanitize(linkHTML, {
          ALLOWED_ATTR: ['target', 'href', 'target', 'class', 'title']
        })
  }

  // image: sanitize > popup
  renderer.image = (src, title, alt) => {
    // HTTP > proxy
    const source = src?.replace(/^http:\/\//gi, `${API_CONFIG.PROXY}/`)
    const imageHTML = trimHTML(`
      <img
        class="${LOZAD_CLASS_NAME}"
        data-src="${source}"
        title="${title || alt || META.url}"
        alt="${alt || title || source}"
        onclick="window.$popup?.vImage('${source}')"
      />
    `)

    return !options?.sanitize
      ? imageHTML
      : DOMPurify.sanitize(imageHTML, {
          ALLOW_DATA_ATTR: true,
          ALLOWED_ATTR: ['alt', 'onclick', 'class', 'title']
        })
  }

  // code: line number
  renderer.code = function (code, lang, escaped) {
    if (renderer.options.highlight) {
      const output = renderer.options.highlight(code, lang || '')
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
            class="${renderer.options.langPrefix}${escape(lang)}"
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

  return renderer
}

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs language-',
  highlight(code, language) {
    return highlight.getLanguage(language)
      ? highlight.highlight(language, code).value
      : highlight.highlightAuto(code).value
  }
})

export interface MarkdownRenderOption {
  sanitize?: boolean
  relink?: boolean
  tagMap?: TagMap
  headingIDRenderer?: RendererGetterOption['headingID']
}
export const markdownToHTML = (markdown: string, options?: MarkdownRenderOption) => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  const parseOptions: marked.MarkedOptions = {
    renderer: getRenderer({ headingID: options?.headingIDRenderer })
  }

  // relink
  if (options?.relink) {
    parseOptions.renderer = getRenderer({
      text: (text) => relink(text, options.tagMap as TagMap),
      headingID: options?.headingIDRenderer
    })
  }

  // sanitize
  if (options?.sanitize) {
    parseOptions.renderer = getRenderer({ sanitize: true, headingID: options?.headingIDRenderer })
  }

  return marked.parse(markdown, parseOptions)
}
