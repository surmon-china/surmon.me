
const Clipboard = require('clipboard')

if (process.browser) {
	window.Clipboard = Clipboard
}

export default {}
