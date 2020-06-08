/**
 * @file 弹窗服务 / ES module
 * @module plugins/popup
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin, inject, readonly, reactive } from 'vue'
import PopupRootComponent from './popup-root.vue'
import PopupComponent from './popup.vue'

declare global {
  interface Window {
    popup: Popup
  }
}

export enum PopupType {
  Image = 'img',
  Video = 'video',
  Iframe = 'iframe'
}

const PopupSymbol = Symbol('popup')
const createPopupStore = () => {
  const state = reactive({
    visibility: false,
    type: null as null | PopupType,
    src: null as null | string,
    props: null as null | object
  })

  const visible = (options: { type: PopupType, src: string, props?: object }) => {
    state.visibility = true
    state.src = options.src
    state.type = options.type
    state.props = options.props || {}
  }

  const hidden = () => {
    state.visibility = false
    state.type = null
    state.src = null
    state.props = null
  }

  return {
    state: readonly(state),
    visible,
    hidden,
  }
}

export interface PopupPluginConfig { exportToGlobal?: boolean }
export type Popup = ReturnType<typeof createPopupStore>
export const createPopup = (): Popup & Plugin => {
  const popupStore = createPopupStore()
  return {
    ...popupStore,
    install(app: App, config: PopupPluginConfig) {
      app.provide(PopupSymbol, popupStore)
      app.component(PopupComponent.name as string, PopupComponent)
      app.component(PopupRootComponent.name as string, PopupRootComponent)
      if (config?.exportToGlobal) {
        window.popup = popupStore
      }
    }
  }
}

export const usePopup = (): Popup => {
  return inject(PopupSymbol) as Popup
}

/*
// 销毁弹窗
const closePopup = (documentId: string) => new Promise(resolve => {
  const mask = document.getElementById(documentId)
  if (mask) {
    window.onscroll = null
    mask.setAttribute('class', '')
    setTimeout(() => {
      document.body.removeChild(mask)
      resolve()
    }, 350)
  } else {
    resolve()
  }
})

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
const openImgPopup = (src: string, className?: string) => {
  if (!src) return false
  const image = document.createElement('img')
  image.src = src
  if (className) {
    image.setAttribute('class', className)
  }

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

export const mountePopupToWindow = () => {
  window.utils.openImgPopup = openImgPopup
  window.utils.closeImgPopup = closeImgPopup
  window.utils.openIframePopup = openIframePopup
  window.utils.closeIframePopup = closeIframePopup
}
*/