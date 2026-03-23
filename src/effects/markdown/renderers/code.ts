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
      return `<div class="code-lines">${code
        .split('\n')
        .map((_, i) => `<span class="code-line-number">${i + 1}</span>`.replace(/\s+/g, ' '))
        .join('')}</div>`
    }

    return `
      <pre ${langString ? `data-lang="${langString}"` : ''}>
        <div class="language-header">
          <span class="name">
            <i class="iconfont icon-code"></i>
            <span class="text">${langString ? (markdownCodeLanguageNamesMap.get(langString.toLowerCase()) ?? langString) : 'code'}</span>
          </span>
          <button
            class="copy"
            title="Copy code"
            onclick="
              const button = this;
              if (button.dataset.copied) return;
              navigator.clipboard.writeText(button.closest('pre').querySelector('code').innerText);
              button.dataset.copied = true;
              setTimeout(() => delete button.dataset.copied, 3000);
            "
            >
            <i class="iconfont icon-copy-outlined"></i>
            <i class="iconfont icon-copy-success"></i>
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
