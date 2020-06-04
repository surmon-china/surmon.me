/**
 * @file 懒加载
 * @module service/lozad
 * @author Surmon <https://github.com/surmon-china>
 */

import lozad from 'lozad'

declare global {
  interface Window {
    lozad: lozad.Selector
  }
}

export const exportLozadToGlobal = () => {
  window.lozad = lozad as any
}
