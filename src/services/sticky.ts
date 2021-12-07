/**
 * @file sticky event hack lib
 * @module service.sticky
 * @author Surmon <https://github.com/surmon-china>
 */

import StickyEvents from 'sticky-events'

declare global {
  interface Window {
    $StickyEvents: any
  }
}

export const exportStickyEventsToGlobal = () => {
  window.$StickyEvents = StickyEvents
}
