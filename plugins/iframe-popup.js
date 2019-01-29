/**
 * @file Iframe 弹窗服务 / ES module
 * @module plugins/iframe-popup
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'

if (isBrowser) {

  // 销毁 Iframe 弹窗
  const closeIframePopup = () => {
    const mask = document.getElementById('iframe-popup')
    if (mask) {
      window.onscroll = null
      mask.setAttribute('class', '')
      setTimeout(() => {
        mask && document.body.removeChild(mask)
      }, 350)
    }
  }

  // 打开 Iframe 弹窗
  const openIframePopup = (src, className) => {
    if (!src) return false

    const iframe = document.createElement('iframe')
    iframe.src = src
    iframe.scrolling = 'no'
    iframe.border = 0
    iframe.frameborder = 'no'
    iframe.framespacing = 0
    iframe.allowfullscreen = true
    className && iframe.setAttribute('class', className)

    const oldMask = document.getElementById('iframe-popup')
    oldMask && document.body.removeChild(oldMask)

    const mask = document.createElement('div')
    mask.setAttribute('id', 'iframe-popup')
    mask.appendChild(iframe)
    document.body.appendChild(mask)
    
    setTimeout(() => {
      mask.setAttribute('class', 'display')
    }, 100)
    // 监听滚动和点击事件
    window.onscroll = closeIframePopup
    mask.onclick = event => {
      if (event.target.tagName !== 'IMG') {
        closeIframePopup()
      }
    }
  }

  window.utils = window.utils || {}
  window.utils.openIframePopup = openIframePopup
  window.utils.closeIframePopup = closeIframePopup
}
