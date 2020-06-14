/**
 * @file 弹窗服务
 * @module services/popup
 * @author Surmon <https://github.com/surmon-china>
 * @example window.popup.vImage('http://xxx.jpg')
 */

import { App, Plugin, inject, readonly, reactive, onMounted, nextTick } from 'vue'
import PopupRootComponent from './root.vue'
import PopupComponent from './popup'
import PopupImageComponent from './image'

declare global {
  interface Window {
    popup: Popup
  }
}

const PopupSymbol = Symbol('popup')
const createPopupStore = () => {

  const image = reactive({
    src: null as null | string,
    attrs: null as null | object
  })

  const state = reactive({
    visibility: false,
    isImage: false,
    // UI options
    border: true,
    maskClose: true,
    scrollClose: true,
    closeButton: true,
    // inner
    $container: null as null | HTMLElement
  })

  const hidden = (cb?: () => void) => {
    if (!state.visibility) {
      cb?.()
      return
    }
    state.visibility = false
    state.isImage = false
    image.src = null
    image.attrs = null
    if (cb) {
      nextTick(cb)
    }
  }

  const visible = (options?: Partial<typeof state>) => {
    hidden(() => {
      Object.assign(state, {
        ...options,
        isImage: false,
        visibility: true
      })
    })
  }

  const vImage = (src: string, attrs?: any, options?: Partial<typeof state>) => {
    hidden(() => {
      image.src = src
      image.attrs = attrs
      Object.assign(state, {
        ...options,
        isImage: true,
        visibility: true
      })
    })
  }

  const $setRoot = (element: HTMLElement) => {
    state.$container = element
  }

  return {
    state: readonly(state),
    image: readonly(image),
    visible,
    hidden,
    vImage,
    $setRoot
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
      // @ts-expect-error
      app.component(PopupComponent.name as string, PopupComponent)
      // @ts-expect-error
      app.component(PopupImageComponent.name as string, PopupImageComponent)
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

export const usePopupWithRoot = (fn: () => HTMLElement): Popup => {
  const popup = usePopup()
  onMounted(() => popup.$setRoot(fn()))
  return popup
}
