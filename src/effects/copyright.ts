/**
 * @file copyright
 * @module effect.copyright
 * @author Surmon <https://github.com/surmon-china>
 */

import { META } from '/@/config/app.config'

declare global {
  interface Window {
    __isEnabledCopyrighter: boolean
  }
}

export const enableCopyrighter = () => {
  window.__isEnabledCopyrighter = true
}

export const disableCopyrighter = () => {
  window.__isEnabledCopyrighter = false
}

export const initCopyrighter = () => {
  enableCopyrighter()

  const copyText = () => {
    return [
      '',
      '',
      `作者：${META.author}`,
      `链接：${location.href}`,
      `来源：${META.title}`,
      '著作权归作者所有，商业转载请联系作者获得授权，非商业转载请注明出处。'
    ].join('\n')
  }

  const buildText = (content) => content + copyText()
  const buildHtml = (content) => content + copyText()

  document.addEventListener('copy', (event) => {
    if (!window.getSelection) return
    if (window.__isEnabledCopyrighter) {
      const content = window.getSelection()?.toString()
      event.clipboardData?.setData('text/plain', buildText(content))
      event.clipboardData?.setData('text/html', buildHtml(content))
      event.preventDefault()
    }
  })
}
