/**
 * @file popup hook
 * @module composable.popup.hook
 * @author Surmon <https://github.com/surmon-china>
 */

import { inject, onMounted } from 'vue'
import { PopupSymbol } from './constant'
import type { Popup } from '.'

export const usePopup = (): Popup => {
  return inject(PopupSymbol) as Popup
}

export const usePopupWithRoot = (fn: () => HTMLElement): Popup => {
  const popup = usePopup()
  onMounted(() => popup.$setRoot(fn()))
  return popup
}
