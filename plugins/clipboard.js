
import Clipboard from 'clipboard'

if (process.browser) {
  window.Clipboard = Clipboard
}

export default {}
