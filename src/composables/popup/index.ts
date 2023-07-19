/**
 * @file Client popup
 * @module composable.popup
 * @author Surmon <https://github.com/surmon-china>
 * @example window.$popup.vImage('https://xxx.jpg')
 */

import { App, Plugin, readonly, reactive, nextTick } from 'vue'
import PopupRootComponent from './root.vue'
import PopupImageComponent from './image'
import PopupComponent from './popup'
import { PopupSymbol } from './constant'

declare module 'vue' {
  export interface GlobalComponents {
    Popup: typeof PopupComponent
    PopupRoot: typeof PopupRootComponent
    PopupImage: typeof PopupImageComponent
  }
}

declare global {
  interface Window {
    // @ts-ignore
    $popup: Popup
  }
}

const DEFAULT_STATE = Object.freeze({
  visible: false as boolean,
  isImage: false as boolean,
  border: true as boolean,
  maskClose: true as boolean,
  scrollClose: true as boolean
})

const createPopupStore = () => {
  const image = reactive({
    src: null as null | string,
    attrs: null as null | object
  })

  const state = reactive({
    $container: null as null | HTMLElement,
    ...DEFAULT_STATE
  })

  const hidden = (cb?: () => void) => {
    if (!state.visible) {
      cb?.()
      return
    }
    Object.assign(state, { ...DEFAULT_STATE })
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
        visible: true
      })
    })
  }

  const vImage = (src: string, attrs?: any, options?: Partial<typeof state>) => {
    hidden(() => {
      image.src = src
      image.attrs = attrs
      Object.assign(state, {
        ...options,
        border: true,
        isImage: true,
        visible: true
      })
    })
  }

  return {
    state: readonly(state),
    image: readonly(image),
    visible,
    hidden,
    vImage,
    $setRoot: (element: HTMLElement) => {
      state.$container = element
    }
  }
}

export interface PopupPluginConfig {
  exportToGlobal?: boolean
}
// @ts-ignore
export type Popup = ReturnType<typeof createPopupStore>
export const createPopup = (): Popup & Plugin => {
  const popupStore = createPopupStore()
  return {
    ...popupStore,
    install(app: App, config: PopupPluginConfig) {
      app.provide(PopupSymbol, popupStore)
      app.component('Popup', PopupComponent)
      app.component('PopupImage', PopupImageComponent)
      app.component('PopupRoot', PopupRootComponent)
      if (config?.exportToGlobal) {
        ;(window as any).$popup = popupStore
      }
    }
  }
}
