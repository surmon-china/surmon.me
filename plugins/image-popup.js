/**
 * @file 图片弹窗服务 / ES module
 * @module plugins/image-popup
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'

if (isBrowser) {

  // 销毁图片弹窗
  const closeImgPopup = () => {
    const mask = document.getElementById('image-popup')
    if (mask) {
      window.onscroll = null
      mask.setAttribute('class', '')
      setTimeout(() => {
        mask && document.body.removeChild(mask)
      }, 350)
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
}
