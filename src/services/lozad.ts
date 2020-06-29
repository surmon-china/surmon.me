/**
 * @file 懒加载
 * @module service/lozad
 * @author Surmon <https://github.com/surmon-china>
 */

import lozad from 'lozad'

export type LozadSelector = lozad.Selector
export type LozadObserver = lozad.Observer

declare global {
  interface Window {
    lozad: LozadSelector
  }
}

export const exportLozadToGlobal = () => {
  window.lozad = lozad as any
}
