/**
 * @file amplitude player
 * @module service.amplitude
 * @author Surmon <https://github.com/surmon-china>
 */

import amplitude from 'amplitudejs'
import { isClient } from '/@/app/environment'

declare global {
  interface Window {
    Amplitude: any
    AmplitudeCore: any
  }
}

if (isClient) {
  window.Amplitude = window.Amplitude || amplitude
}

export default amplitude
