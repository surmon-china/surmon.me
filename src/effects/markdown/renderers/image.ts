import { sanitizeUrl } from '@braintree/sanitize-url'
import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'
import { LOZAD_CLASS_NAME } from '/@/composables/lozad'
import { getLoadingIndicatorHTML } from '/@/components/common/loading-indicator'
import { getOriginalProxyURL } from '/@/transforms/url'
import { escape } from '/@/transforms/text'
import { sanitizeHTML, trimHTML } from './html'

export const createImageRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['image'] => {
  return function ({ href, title, text }) {
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
        <figure class="image${altValue ? ' caption' : ''}" data-status="loading">
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
              onload="this.closest('figure').dataset.status = 'loaded'"
              onerror="this.closest('figure').dataset.status = 'error'"
              onclick="window.$popup?.image(this.currentSrc || this.src)"
            />
          </picture>
          ${altValue ? `<figcaption>${altValue}</figcaption>` : ''}
        </figure>
      </div>
    `)
  }
}
