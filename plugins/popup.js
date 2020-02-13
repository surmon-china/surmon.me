/**
 * @file 弹窗服务 / ES module
 * @module plugins/popup
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment'

if (isBrowser) {
  // 销毁弹窗
  const closePopup = documentID => {
    const mask = document.getElementById(documentID)
    if (mask) {
      window.onscroll = null
      mask.setAttribute('class', '')
      setTimeout(() => {
        mask && document.body.removeChild(mask)
      }, 350)
    }
  }
  const closeImgPopup = () => closePopup('image-popup')
  const closeIframePopup = () => closePopup('iframe-popup')

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

  // 打开图片弹窗
  const openImgPopup = (src, className) => {
    if (!src) return false
    const image = document.createElement('img')
    image.src = src
    className && image.setAttribute('class', className)

    const oldMask = document.getElementById('image-popup')
    oldMask && document.body.removeChild(oldMask)

    const mask = document.createElement('div')
    mask.setAttribute('id', 'image-popup')
    mask.appendChild(image)
    document.body.appendChild(mask)

    setTimeout(() => {
      mask.setAttribute('class', 'display')
    }, 100)
    // 监听滚动和点击事件
    window.onscroll = closeImgPopup
    mask.onclick = closeImgPopup
  }

  window.utils = window.utils || {}
  window.utils.openImgPopup = openImgPopup
  window.utils.closeImgPopup = closeImgPopup
  window.utils.openIframePopup = openIframePopup
  window.utils.closeIframePopup = closeIframePopup
}
