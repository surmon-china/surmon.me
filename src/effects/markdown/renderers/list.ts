import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'

export const createListItemRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['listitem'] => {
  return function (item) {
    const firstType = item.tokens[0].type
    const html = renderer.parser.parse(item.tokens)
    return `<li data-type="${firstType}">${html}</li>\n`
  }
}
