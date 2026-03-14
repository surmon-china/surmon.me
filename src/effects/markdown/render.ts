import { pangu } from 'pangu'
import { createMarked } from './marked'
import { createRenderer, CreateRendererOptions } from './renderer'

const markedDefault = createMarked()
const markedWithSpacing = createMarked().use({
  // https://marked.js.org/using_pro#walk-tokens
  walkTokens(token) {
    // Only text nodes that do not contain child elements can be determined to be plain text.
    if (token.type === 'text' && !token.tokens?.length) {
      token.text = pangu.spacingText(token.text)
    }
  }
})

export interface RenderMarkdownOptions extends Partial<CreateRendererOptions> {
  chineseSpacing?: boolean
}

export const renderMarkdownToHTML = (markdown: string, options?: RenderMarkdownOptions) => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  const _marked = options?.chineseSpacing ? markedWithSpacing : markedDefault
  const _renderer = createRenderer({
    ...options,
    sanitize: options?.sanitize ?? false,
    lazyLoadImage: options?.lazyLoadImage ?? true,
    codeLineNumbers: options?.codeLineNumbers ?? true
  })

  return _marked.parse(markdown, { renderer: _renderer }) as string
}
