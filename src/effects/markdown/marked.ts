import { Marked } from 'marked'
import { mangle } from 'marked-mangle'
import { markedXhtml } from 'marked-xhtml'
import { markedHighlight } from 'marked-highlight'
import highlight from '../highlight'

export const createMarked = () => {
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

  return marked
}
