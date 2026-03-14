import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'

export const createParagraphRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['paragraph'] => {
  return function ({ tokens }) {
    const html = renderer.parser.parseInline(tokens)
    const hasImage = tokens.some((token) => token.type === 'image')
    return hasImage ? html : `<p>${html}</p>`
  }
}
