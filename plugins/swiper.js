let swiper = {}

if (process.BROWSER_BUILD) {
	const swiper = window.Swiper = require('swiper')
}

export default swiper