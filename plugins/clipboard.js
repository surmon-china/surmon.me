let Clipboard

if (process.BROWSER_BUILD) {
	window.Clipboard = Clipboard = require('clipboard')
}

export default Clipboard