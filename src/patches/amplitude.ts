/**
 * @file emoji 表情雨服务
 * @module service/emoji-233333
 * @author Surmon <https://github.com/surmon-china>
 */

import amplitude from 'amplitudejs'

declare global {
  interface Window {
    Amplitude: any
    AmplitudeCore: any
  }
}

if (typeof window !== 'undefined') {
  // HACK: Fix #387 https://github.com/521dimensions/amplitudejs/issues/387
  // @ts-ignore
  window.AmplitudeCore = window.AmplitudeCore || {
    stop: () => console.warn('Forge AmplitudeCore Stop...')
  }
  window.Amplitude = window.Amplitude || amplitude
}

export default amplitude
