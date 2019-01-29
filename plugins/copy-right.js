/**
 * @file 复制拦截器 / ES module
 * @module plugins/copy-right
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'

if (isBrowser) {
 
  const copyText = () => {
    return [
      '',
      '著作权归作者所有。',
      '商业转载请联系作者获得授权，非商业转载请注明出处。',
      '作者：Surmon',
      '链接：' + location.href,
      '来源：Surmon.me',
      ''
    ].join('\n')
  }
  
  // 拼接成html
  const buildText = content => {
    return content + copyText()
  }

  // 拼接成html
  const buildHtml = content => {
    return content + copyText()
  }

  document.addEventListener('copy', e => {
    if (!window.getSelection) return
    if (!window.clickCopy) {
      const content = window.getSelection().toString()
      e.clipboardData.setData('text/plain', buildText(content))
      e.clipboardData.setData('text/html', buildHtml(content))
      e.preventDefault()
    }
  })
}
