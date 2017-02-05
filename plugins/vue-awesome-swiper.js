import Vue from 'vue'

if (process.BROWSER_BUILD) {
	let { swiper, swiperSlide } = require('~utils/vue-awesome-swiper')
  Vue.component('swiper', swiper)
  Vue.component('swiper-slide', swiperSlide)
}
