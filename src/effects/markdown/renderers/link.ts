import { sanitizeUrl } from '@braintree/sanitize-url'
import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'
import { APP_PROFILE } from '/@/configs/app.config'
import { escape } from '/@/transforms/text'
import { sanitizeHTML, trimHTML } from './html'

export const createLinkRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['link'] => {
  return function ({ href, title, tokens, text: _text }) {
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
}
