import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'

export const createListItemRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['listitem'] => {
  return function (item) {
    const firstTokenType = item.tokens[0]?.type
    const dataType = firstTokenType ? ` data-type="${firstTokenType}"` : ''
    const html = renderer.parser.parse(item.tokens)
    return `<li${dataType}>${html}</li>\n`
  }
}
