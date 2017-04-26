
const Clipboard = require('clipboard')
if (process.BROWSER_BUILD) {
	window.Clipboard = Clipboard
}

export default Clipboard
