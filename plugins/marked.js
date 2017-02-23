import marked from 'marked'
import Hljs from '~plugins/highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return Hljs.highlightAuto(code).value;
  }
})

const renderer = new marked.Renderer()
console.log(renderer)
renderer.link = (href, title, text) => {
  const isSelf = href.includes('surmon.me')
  return `<a href="${href}" target="_blank" title="${title || text}" ${isSelf ? '' : 'rel="external nofollow"'}>${text}</a>`
}

renderer.image = (href, title, text) => {
  const isSelf = href.includes('surmon.me')
  return `<a href="${href}" target="_blank" title="${title || text}" ${isSelf ? '' : 'rel="external nofollow"'}>${text}</a>`
}

renderer.text = (href, title, text) => {
  const isSelf = href.includes('surmon.me')
  return `<a href="${href}" target="_blank" title="${title || text}" ${isSelf ? '' : 'rel="external nofollow"'}>${text}</a>`
}

export default content => marked(content, { renderer })