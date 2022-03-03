/**
 * @file App exporter
 * @module effect.exporter
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'

declare global {
  interface Window {
    $app: App
  }
}

export const exportAppToGlobal = (app: App) => {
  window.$app = app
}
