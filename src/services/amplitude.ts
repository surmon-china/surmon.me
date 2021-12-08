/**
 * @file amplitude player
 * @module service.amplitude
 * @author Surmon <https://github.com/surmon-china>
 */

import amplitude from 'amplitudejs'
import { onClient } from '/@/universal'

declare global {
  interface Window {
    Amplitude: any
    AmplitudeCore: any
  }
}

onClient(() => {
  window.Amplitude = window.Amplitude || amplitude
})

export default amplitude
