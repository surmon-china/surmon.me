/*
 *
 * clmtrackr.js
 *
*/

import apiConfig from '~/api.config'
import uaParse from '~/utils/ua-parse'
if (process.browser) {
  const { isMobile } = uaParse(navigator.userAgent)
  if (!isMobile) {
    window.addLoadedTask(() => {
      const clmtrackrScript = document.createElement('script')
      clmtrackrScript.src = `${apiConfig.cdnUrl}/scripts/clmtrackr.js`
      clmtrackrScript.defer = 'defer'
      document.body.appendChild(clmtrackrScript)
    })
  }
}
