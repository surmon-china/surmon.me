import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'
import { escape } from '/@/transforms/text'

const markdownCodeLanguageNamesMap = new Map([
  ['js', 'JavaScript'],
  ['javascript', 'JavaScript'],
  ['ts', 'TypeScript'],
  ['typescript', 'TypeScript'],
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['scss', 'Scss'],
  ['vue', 'Vue'],
  ['sql', 'SQL'],
  ['json', 'JSON'],
  ['python', 'Python']
])

export const createCodeRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['code'] => {
  return function ({ text, lang, escaped }) {
    const code = text.replace(/\n$/, '')
    const langString = (lang || '').match(/^\S*/)?.[0]

    const getLineNumbersElement = () => {
      return `<ul class="code-lines">${code
        .split('\n')
        .map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
        .join('')}</ul>`
    }

    return `
      <pre ${langString ? `data-lang="${langString}"` : ''}>
        <div class="language-header">
          <span class="name">
            <i class="iconfont icon-code"></i>
            <span class="text">${langString ? (markdownCodeLanguageNamesMap.get(langString.toLowerCase()) ?? langString) : 'code'}</span>
          </span>
          <button class="copy" title="Copy code" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('code').innerText)">
            <i class="iconfont icon-copy-outlined"></i>
          </button>
        </div>
        <div class="code-wrapper">
          ${options?.codeLineNumbers ? getLineNumbersElement() : ''}
          <code>${escaped ? code : escape(code)}</code>
        </div>
      </pre>
    `
  }
}
