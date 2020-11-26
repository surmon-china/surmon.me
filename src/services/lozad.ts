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
    $lozad: LozadSelector
  }
}

export const LOZAD_CLASS_NAME = 'lozad'
export const LOADED_CLASS_NAME = 'loaded'

export const exportLozadToGlobal = () => {
  window.$lozad = lozad as any
}
