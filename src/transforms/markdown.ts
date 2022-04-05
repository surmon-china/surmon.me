/**
 * @file Markdown parser
 * @module transform.markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import sanitizeHTML from 'sanitize-html'
import { marked, Renderer } from 'marked'
import highlight from '/@/effects/highlight'
import { TagMap } from '/@/stores/tag'
import { LOZAD_CLASS_NAME } from '/@/effects/lozad'
import { escape } from '/@/transforms/text'
import relink from '/@/transforms/relink'
import API_CONFIG from '/@/config/api.config'
import { META } from '/@/config/app.config'

const trimHTML = (html: string) => html.replace(/\s+/g, ' ').replace(/\n/g, ' ')
interface RendererGetterOption {
  sanitize: boolean
  text: (text: string) => string
  headingID: (html: string, level: number, raw: string) => string
}
const getRenderer = (options?: Partial<RendererGetterOption>) => {
  const renderer = new Renderer()

  // text
  renderer.text = (text) => {
    return options?.text ? options.text(text) : text
  }

  // html: escape > sanitize
  renderer.html = (html) => {
    // https://github.com/apostrophecms/sanitize-html#default-options
    return options?.sanitize ? sanitizeHTML(escape(html)) : html
  }

  // heading
  renderer.heading = (html, level, raw) => {
    const idText = options?.headingID ? `id="${options.headingID(html, level, raw)}"` : ''
    const safeRaw = escape(raw)
    return `<h${level} ${idText} alt="${safeRaw}" title="${safeRaw}">${html}</h${level}>`
  }

  // paragraph
  renderer.paragraph = (text) => {
    const trimmed = text.trim()
    if (trimmed.startsWith(`<figure`) && trimmed.endsWith(`</figure>`)) {
      return text
    } else {
      return `<p>${text}</p>`
    }
  }

  // checkbox
  renderer.checkbox = (checked) => {
    return checked
      ? `<i class="checkbox checked iconfont icon-checkbox-selected"></i>`
      : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`
  }

  // link: sanitize
  renderer.link = (href, title, text) => {
    const isSelf = href?.startsWith(META.url)
    const textIsImage = text.includes('<img')
    const linkHTML = trimHTML(`<a
      href="${href}"
      target="_blank"
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${title || (textIsImage ? href : text)}"
      ${isSelf ? '' : 'rel="external nofollow noopener"'}
    >${text}</a>`)

    return !options?.sanitize
      ? linkHTML
      : sanitizeHTML(linkHTML, {
          allowedTags: ['a'],
          allowedAttributes: {
            a: ['href', 'target', 'class', 'title', 'rel', 'data-*']
          }
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
        title="${title || alt || META.domain}"
        ${alt ? `alt="${alt}"` : ''}
        onclick="window.$popup?.vImage('${source}')"
      />
    `)

    // sanitize > can't render figcaption
    if (options?.sanitize) {
      return sanitizeHTML(imageHTML, {
        allowedTags: ['img'],
        allowedAttributes: {
          img: ['alt', 'onclick', 'class', 'title', 'data-*']
        }
      })
    }

    // figure > admin & alt
    if (alt) {
      return trimHTML(`
        <figure class="image">
          ${imageHTML}
          <figcaption>${alt}</figcaption>
        </figure>
      `)
    }

    return imageHTML
  }

  // code: line number
  renderer.code = function (code, lang, isEscaped) {
    if (renderer.options.highlight) {
      const output = renderer.options.highlight(code, lang || '')
      if (output != null && output !== code) {
        isEscaped = true
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
            class="${renderer.options.langPrefix}${encodeURI(lang)}"
          >${isEscaped ? code : encodeURI(code)}\n</code>
        </pre>\n
      `
      : `
        <pre>
          <ul class="code-lines">${lineNumbers}</ul>
          <code ${readOnlyAttrs}>${isEscaped ? code : encodeURI(code)}\n</code>
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
      ? highlight.highlight(code, { language }).value
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
