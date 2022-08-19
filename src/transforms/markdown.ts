/**
 * @file Markdown parser
 * @module transform.markdown
 * @author Surmon <https://github.com/surmon-china>
 */

// https://github.com/vitejs/vite/issues/9200
// https://github.com/vitejs/vite/issues/9238
// https://github.com/wolfiex/GeoDraw-SvelteKit/issues/2
// https://github.com/apostrophecms/sanitize-html/issues/560
// https://github.com/Greenheart/idg.tools/commit/15de4725dc8fdafe2fc86c24b5c32f3646f4cb29
// https://github.com/kkomelin/isomorphic-dompurify/blob/master/src/index.js
// MARK: Use dompurify instead of sanitize-html because sanitize-html doesn't work in browser.
import DOMPurify from 'isomorphic-dompurify'
import highlight from '/@/effects/highlight'
import { marked, Renderer } from 'marked'
import { TagMap } from '/@/stores/tag'
import { LOZAD_CLASS_NAME } from '/@/composables/lozad'
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
    return options?.sanitize ? DOMPurify.sanitize(escape(html)) : html
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
    const isFigure = trimmed.startsWith(`<figure`) && trimmed.endsWith(`</figure>`)
    const isDiv = trimmed.startsWith(`<div`) && trimmed.endsWith(`</div>`)
    return isFigure || isDiv ? text : `<p>${text}</p>`
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
    const isImageLink = text.includes('<img')
    const linkHTML = trimHTML(`<a
      href="${href}"
      target="_blank"
      class="${isImageLink ? 'image-link' : 'link'}"
      title="${title || (isImageLink ? href : text)}"
      ${isSelf ? '' : 'rel="external nofollow noopener"'}
    >${text}</a>`)

    return !options?.sanitize
      ? linkHTML
      : DOMPurify.sanitize(linkHTML, {
          ALLOWED_TAGS: ['a'],
          ALLOW_DATA_ATTR: true,
          ALLOWED_ATTR: ['href', 'target', 'class', 'title', 'rel']
        })
  }

  // image: sanitize(title, alt) > popup
  renderer.image = (src, title, alt) => {
    // HTTP > proxy
    const source = src?.replace(/^http:\/\//gi, `${API_CONFIG.PROXY}/`)
    const sTitle = DOMPurify.sanitize(escape(title || alt))
    const sAlt = DOMPurify.sanitize(escape(alt!))

    // figure > alt
    return trimHTML(`
      <div class="figure-wrapper">
        <figure class="image ${sAlt ? 'caption' : ''}" data-status="loading">
          <div class="placeholder error">
            <i class="iconfont icon-image-error"></i>
          </div>
          <div class="placeholder loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img
            class="${LOZAD_CLASS_NAME}"
            data-src="${source}"
            ${sAlt ? `alt="${sAlt}"` : ''}
            ${sTitle ? `title="${sTitle}"` : ''}
            onload="this.parentElement.dataset.status = 'loaded'"
            onerror="this.parentElement.dataset.status = 'error'"
            onclick="window.$popup.vImage(this.src)"
          />
          ${sAlt ? `<figcaption>${sAlt}</figcaption>` : ''}
        </figure>
      </div>
    `)
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

  const renderOptions: Partial<RendererGetterOption> = {
    headingID: options?.headingIDRenderer
  }

  // relink
  if (options?.relink) {
    renderOptions.text = (text) => relink(text, options.tagMap as TagMap)
  }

  // sanitize
  if (options?.sanitize) {
    renderOptions.sanitize = true
  }

  return marked.parse(markdown, { renderer: getRenderer(renderOptions) })
}
