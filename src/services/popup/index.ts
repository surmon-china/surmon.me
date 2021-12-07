/**
 * @file Client popup
 * @module service.popup
 * @author Surmon <https://github.com/surmon-china>
 * @example window.$popup.vImage('https://xxx.jpg')
 */

import { App, Plugin, readonly, reactive, nextTick } from 'vue'
import PopupRootComponent from './root.vue'
import PopupImageComponent from './image'
import PopupComponent from './popup'
import { PopupSymbol } from './constant'

declare global {
  interface Window {
    // @ts-ignore
    $popup: Popup
  }
}

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
      // @ts-ignore
      app.component(PopupComponent.name as string, PopupComponent)
      // @ts-ignore
      app.component(PopupImageComponent.name as string, PopupImageComponent)
      app.component(PopupRootComponent.name as string, PopupRootComponent)
      if (config?.exportToGlobal) {
        ;(window as any).$popup = popupStore
      }
    }
  }
}
