/**
 * @file lazy load
 * @module effect.lozad
 * @author Surmon <https://github.com/surmon-china>
 */

import lozad from 'lozad'

export type LozadSelector = lozad.Selector
export type LozadObserver = lozad.Observer

declare global {
  interface Window {
    $lozad: typeof lozad
  }
}

export const LOZAD_CLASS_NAME = 'lozad'
export const LOADED_CLASS_NAME = 'loaded'

export const exportLozadToGlobal = () => {
  window.$lozad = lozad as any
}
