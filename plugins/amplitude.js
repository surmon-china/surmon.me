/**
 * @file amplitude / ES module
 * @module plugins/amplitude
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment'
import * as amplitudejs from 'amplitudejs'

if (isBrowser) {
  window.Amplitude = amplitudejs
  // Fix #387 https://github.com/521dimensions/amplitudejs/issues/387
  window.AmplitudeCore = window.AmplitudeCore || {
    stop: () => console.warn('Forge AmplitudeCore Stop...')
  }
}

export default amplitudejs
