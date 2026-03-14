import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'
import { escape } from '/@/transforms/text'

export const createHeadingRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['heading'] => {
  return function ({ depth, tokens, text }) {
    const getAnchorWithLink = (anchor: string) => {
      const preventDefault = `event.preventDefault()`
      const copy = `window.navigator.clipboard?.writeText(this.href)`
      const onclick = `onclick="${preventDefault};${copy}"`
      const href = `href="#${anchor}"`
      const icon = `<i class="iconfont icon-heading-pound"></i>`
      return `<a class="anchor link" ${href} ${onclick}>${icon}</a>`
    }

    const identifier = options?.headingIdentifierGetter?.(depth, text)
    const idAttr = identifier?.id ? `id="${identifier.id}"` : ''
    const titleAttr = `title="${escape(text)}"`
    const anchorElement = identifier?.anchor ? getAnchorWithLink(identifier.anchor) : ''
    const html = renderer.parser.parseInline(tokens)

    return `<h${depth} ${idAttr} ${titleAttr}>${anchorElement}${html}</h${depth}>`
  }
}
