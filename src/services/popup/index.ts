/**
 * @file 弹窗服务
 * @module services/popup
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin, inject, readonly, reactive, onMounted } from 'vue'
import PopupRootComponent from './root.vue'
import PopupComponent from './popup'
import PopupMediumComponent from './medium'

declare global {
  interface Window {
    popup: Popup
  }
}

const PopupSymbol = Symbol('popup')
const createPopupStore = () => {

  const image = reactive({
    src: null as null | string,
    props: null as null | object
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

  const hidden = () => {
    state.isImage = false
    state.visibility = false
    image.src = null
    image.props = null
  }

  const visible = (options?: Partial<typeof state>) => {
    hidden()
    Object.assign(state, {
      ...options,
      isImage: false,
      visibility: true
    })
  }

  const vImage = (src: string, props?: any) => {
    hidden()
    state.isImage = true
    state.visibility = true
    image.src = src
    image.props = props
  }

  const $setRoot = (element: HTMLElement) => {
    state.$container = element
  }

  return {
    state: readonly(state),
    image,
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
      app.component(PopupMediumComponent.name as string, PopupMediumComponent)
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
