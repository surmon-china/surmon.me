import { Renderer } from 'marked'
import { createCodeRenderer } from './renderers/code'
import { createCheckboxRenderer } from './renderers/checkbox'
import { createHtmlRenderer } from './renderers/html'
import { createImageRenderer } from './renderers/image'
import { createHeadingRenderer } from './renderers/heading'
import { createParagraphRenderer } from './renderers/paragraph'
import { createLinkRenderer } from './renderers/link'

export interface CreateRendererOptions {
  sanitize?: boolean
  lazyLoadImage?: boolean
  codeLineNumbers?: boolean
  headingIdentifierGetter?(level: number, text: string): { anchor?: string; id?: string }
  imageSourceGetter?(src: string): string | { src: string; sources: Array<{ srcset: string; type: string }> }
}

// https://github.com/markedjs/marked/blob/master/src/Renderer.ts
export const createRenderer = (options?: CreateRendererOptions): Renderer => {
  const renderer = new Renderer()

  // html: escape > sanitize
  renderer.html = createHtmlRenderer(renderer, options)
  // heading
  renderer.heading = createHeadingRenderer(renderer, options)
  // paragraph
  renderer.paragraph = createParagraphRenderer(renderer, options)
  // checkbox
  renderer.checkbox = createCheckboxRenderer(renderer, options)
  // link: sanitize
  renderer.link = createLinkRenderer(renderer, options)
  // image: sanitize(title, alt) > popup
  renderer.image = createImageRenderer(renderer, options)
  // code: line number
  renderer.code = createCodeRenderer(renderer, options)

  return renderer
}
