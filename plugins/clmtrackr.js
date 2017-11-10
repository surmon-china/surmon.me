/*
 *
 * clmtrackr.js
 *
*/

import apiConfig from '~/api.config'
import UaParse from '~/utils/ua-parse'
if (process.browser) {
  const { isMobile } = UaParse(navigator.userAgent)
  if (!isMobile) {
    window.addEventListener('load', event => {
      window.setTimeout(() => {
        const clmtrackrScript = document.createElement('script')
        clmtrackrScript.src = `${apiConfig.cdnUrl}/scripts/clmtrackr.js`
        clmtrackrScript.defer = 'defer'
        document.body.appendChild(clmtrackrScript)
      }, 0)
    })
  }
}
