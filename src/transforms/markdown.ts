/**
 * @file Markdown parser
 * @module transform/markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import highlight from '/@/effects/highlight'
import { Marked, Renderer } from 'marked'
import { mangle } from 'marked-mangle'
import { markedXhtml } from 'marked-xhtml'
import { markedHighlight } from 'marked-highlight'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { CUSTOM_ELEMENT_LIST } from '/@/effects/elements'
import { LOZAD_CLASS_NAME } from '/@/composables/lozad'
import { getLoadingIndicatorHTML } from '/@/components/common/loading-indicator'
import { APP_PROFILE } from '/@/configs/app.config'
import { getOriginalProxyURL } from './url'
import { escape } from './text'

const markdownCodeLanguageNamesMap = new Map([
  ['js', 'JavaScript'],
  ['javascript', 'JavaScript'],
  ['ts', 'TypeScript'],
  ['typescript', 'TypeScript'],
  ['html', 'HTML'],
  ['css', 'CSS']
])

// https://marked.js.org
const marked = new Marked(
  mangle(),
  markedXhtml(),
  markedHighlight({
    highlight(code, language) {
      return highlight.getLanguage(language)
        ? highlight.highlight(code, { language }).value
        : highlight.highlightAuto(code).value
    }
  })
)

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false
})

// sanitize-html:
// https://github.com/vitejs/vite/issues/9200
// https://github.com/vitejs/vite/issues/9238
// https://github.com/wolfiex/GeoDraw-SvelteKit/issues/2
// https://github.com/apostrophecms/sanitize-html/issues/560
// https://github.com/Greenheart/idg.tools/commit/15de4725dc8fdafe2fc86c24b5c32f3646f4cb29
// MARK: Use dompurify instead of sanitize-html because sanitize-html doesn't work in browser.
// https://github.com/apostrophecms/sanitize-html#browser

// DOMPurify:
// https://github.com/cure53/DOMPurify#running-dompurify-on-the-server
// https://github.com/kkomelin/isomorphic-dompurify/blob/master/src/index.js
// https://github.com/meteor/meteor/issues/10538#issuecomment-489252418
// https://zhuanlan.zhihu.com/p/52990313
// https://github.com/Automattic/node-canvas
// WORKAROUND: `yarn add canvas`
// OSX: `brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman`
// Ubuntu: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`

// MARK: escape vs sanitize https://zhuanlan.zhihu.com/p/421281945
// sanitize and escape are overlapping, for normal users, no html is allowed, so sanitize is not required.
// if sanitize is required, you will encounter many problems.
const sanitizeHTML = (content: string) => content

const trimHTML = (html: string) => html.replace(/\s+/g, ' ').replace(/\n/g, ' ')

interface RendererCreatorOptions {
  sanitize: boolean
  lazyLoadImage: boolean
  codeLineNumbers: boolean
  headingIdentifierGetter(level: number, text: string): { anchor?: string; id?: string }
  imageSourceGetter(src: string): string | { src: string; sources: Array<{ srcset: string; type: string }> }
}

// https://github.com/markedjs/marked/blob/master/src/Renderer.ts
const createRenderer = (options?: Partial<RendererCreatorOptions>): Renderer => {
  const renderer = new Renderer()

  // html: escape > sanitize
  renderer.html = ({ text }) => {
    const trimmed = text.trim()
    const transformed = CUSTOM_ELEMENT_LIST.reduce((result, ce) => ce.transform(result), trimmed)
    // https://github.com/apostrophecms/sanitize-html#default-options
    return options?.sanitize ? sanitizeHTML(escape(transformed)) : transformed
  }

  // heading
  renderer.heading = ({ depth, tokens, text }) => {
    const getAnchorWithLink = (anchor: string) => {
      const preventDefault = `event.preventDefault()`
      const copy = `window.navigator.clipboard?.writeText(this.href)`
      const onclick = `onclick="${preventDefault};${copy}"`
      const href = `href="#${anchor}"`
      return `<a class="anchor link" ${href} ${onclick}>#</a>`
    }

    const html = renderer.parser.parseInline(tokens)
    const identifier = options?.headingIdentifierGetter?.(depth, text)
    const idAttr = identifier?.id ? `id="${identifier.id}"` : ''
    const titleAttr = `title="${escape(text)}"`
    const anchorElement = identifier?.anchor
      ? getAnchorWithLink(identifier.anchor)
      : `<span class="anchor static">#</span>`
    return `<h${depth} ${idAttr} ${titleAttr}>${anchorElement}${html}</h${depth}>`
  }

  // paragraph
  renderer.paragraph = ({ tokens }) => {
    const html = renderer.parser.parseInline(tokens)
    const trimmed = html.trim()
    const isBlockChild = ['p', 'div', 'figure'].some((tag) => {
      return trimmed.startsWith(`<${tag}`) && trimmed.endsWith(`</${tag}>`)
    })
    return isBlockChild ? html : `<p>${html}</p>`
  }

  // checkbox
  renderer.checkbox = ({ checked }) => {
    return checked
      ? `<i class="checkbox checked iconfont icon-checkbox-selected"></i>`
      : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`
  }

  // link: sanitize
  renderer.link = ({ href, title, tokens, text: _text }) => {
    const text = renderer.parser.parseInline(tokens)
    const isCodeLink = text.includes('<code>')
    const isImageLink = text.includes('<img')
    const isSelf = href.startsWith(APP_PROFILE.url)
    const textValue = options?.sanitize ? escape(text) : text
    const hrefValue = options?.sanitize ? sanitizeUrl(href) : href
    const titleValue = options?.sanitize ? escape(title!) : title
    return sanitizeHTML(
      trimHTML(`
        <a
          href="${hrefValue}"
          target="_blank"
          class="${isImageLink ? 'image-link' : isCodeLink ? 'code-link' : 'link'}"
          title="${titleValue || (isImageLink ? hrefValue : escape(_text))}"
          ${isSelf ? '' : 'rel="external nofollow noopener"'}
        >${textValue}</a>
      `)
    )
  }

  // image: sanitize(title, alt) > popup
  renderer.image = ({ href, title, text }) => {
    // HTTP > proxy
    const titleValue = sanitizeHTML(escape(title || text))
    const altValue = sanitizeHTML(escape(text!))
    const sanitized = sanitizeUrl(href!)
    const original = sanitized.startsWith('http://') ? getOriginalProxyURL(sanitized) : sanitized
    const parsed = options?.imageSourceGetter ? options.imageSourceGetter(original) : original
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/currentSrc
    const srcValue = typeof parsed === 'object' ? parsed.src : parsed
    const sourcesValue = typeof parsed === 'object' ? parsed.sources : []

    // figure > alt
    return trimHTML(`
      <div class="figure-wrapper">
        <figure class="image ${altValue ? 'caption' : ''}" data-status="loading">
          <div class="placeholder error">
            <i class="iconfont icon-image-error"></i>
          </div>
          ${getLoadingIndicatorHTML({
            class: 'placeholder loading',
            width: '1.8rem',
            height: '1rem'
          })}
          <picture>
            ${sourcesValue.map((s) => `<source srcset="${s.srcset}" type="${s.type}" />`).join('\n')}
            <img
              draggable="false"
              class="${options?.lazyLoadImage ? LOZAD_CLASS_NAME : ''}"
              ${options?.lazyLoadImage ? `data-src="${srcValue}"` : `src="${srcValue}"`}
              ${altValue ? `alt="${altValue}"` : ''}
              ${titleValue ? `title="${titleValue}"` : ''}
              onload="this.parentElement.parentElement.dataset.status = 'loaded'"
              onerror="this.parentElement.parentElement.dataset.status = 'error'"
              onclick="window.$popup?.image(this.currentSrc || this.src)"
            />
          </picture>
          ${altValue ? `<figcaption>${altValue}</figcaption>` : ''}
        </figure>
      </div>
    `)
  }

  // code: line number
  renderer.code = function ({ text, lang, escaped }) {
    const code = text.replace(/\n$/, '')
    const langString = (lang || '').match(/^\S*/)?.[0]

    const getLineNumbersElement = () => {
      return `<ul class="code-lines">${code
        .split('\n')
        .map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
        .join('')}</ul>`
    }

    return `
      <pre ${langString ? `data-lang="${langString}"` : ''}>
        <div class="language-header">
          <span class="name">
            <i class="iconfont icon-code"></i>
            <span class="text">${langString ? (markdownCodeLanguageNamesMap.get(langString.toLowerCase()) ?? langString) : 'code'}</span>
          </span>
          <button class="copy" title="Copy code" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('code').innerText)">
            <i class="iconfont icon-copy"></i>
          </button>
        </div>
        <div class="code-wrapper">
          ${options?.codeLineNumbers ? getLineNumbersElement() : ''}
          <code>${escaped ? code : escape(code)}</code>
        </div>
      </pre>
    `
  }

  return renderer
}

export type MarkdownRenderOption = Partial<RendererCreatorOptions>
export const markdownToHTML = (markdown: string, options?: MarkdownRenderOption) => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  const renderOptions: Partial<RendererCreatorOptions> = {
    ...options,
    sanitize: options?.sanitize ?? false,
    lazyLoadImage: options?.lazyLoadImage ?? true,
    codeLineNumbers: options?.codeLineNumbers ?? true
  }

  return marked.parse(markdown, { renderer: createRenderer(renderOptions) }) as string
}

export const getMarkdownSplitIndex = (markdown: string, index: number) => {
  const shortContent = markdown.substring(0, index)
  // breakpoint priority: H5 > H4 > H3 > \n\n\n
  const lastH5Index = shortContent.lastIndexOf('\n##### ')
  const lastH4Index = shortContent.lastIndexOf('\n#### ')
  const lastH3Index = shortContent.lastIndexOf('\n### ')
  const lastLineIndex = shortContent.lastIndexOf('\n\n\n')
  const splitIndex = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex)
  // console.log('- content length', contentLength.value, index, splitIndex)
  return splitIndex
}
