/**
 * @file Client popup
 * @module composable/popup
 * @author Surmon <https://github.com/surmon-china>
 * @example window.$popup?.image('https://xxx.jpg')
 * @example window.$popup?.video('https://xxx.mp4')
 * @example
 *  <popup :visible="false" :border="false" :mask-closable=true"">
 *    <div>I will visible on modal</div>
 *  </popup>
 */

import { inject, type App, type Plugin } from 'vue'
import { createPopupState } from './state'
import PopupRootComponent from './popup-root.vue'
import PopupComponent from './popup.vue'

export type Popup = ReturnType<typeof createPopupState>

const PopupSymbol = Symbol('popup-plugin')

export interface PopupPluginConfig {
  exportToGlobal?: boolean
}

export const createPopup = (): Popup & Plugin<PopupPluginConfig> => {
  const popupState = createPopupState()
  return Object.assign(popupState, {
    install(app: App, config: PopupPluginConfig) {
      app.provide(PopupSymbol, popupState)
      app.component('Popup', PopupComponent)
      app.component('PopupRoot', PopupRootComponent)
      app.config.globalProperties.$popup = popupState
      if (config?.exportToGlobal) {
        window.$popup = popupState
      }
    }
  })
}

export const usePopup = (): Popup => {
  return inject(PopupSymbol) as Popup
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $popup: Popup
  }
  interface GlobalComponents {
    Popup: typeof PopupComponent
    PopupRoot: typeof PopupRootComponent
  }
}

declare global {
  interface Window {
    $popup?: Popup
  }
}
