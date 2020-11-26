/**
 * @file vue-awesome-swiper
 * @module default-export
 * @author Surmon <https://github.com/surmon-china>
 */

import SwiperClass from 'swiper'
import exporter from './exporter'
export * from './constants'

// TODO: https://github.com/vuejs/vue-next/commit/0e59770b9282992f6a5af4d8fef33dafb948fc8b
const VueAwesomeSwiper = exporter(SwiperClass)

export const version = VueAwesomeSwiper.version
export const install = VueAwesomeSwiper.install
export const directive = VueAwesomeSwiper.directive
export const Swiper = VueAwesomeSwiper.Swiper
export const SwiperSlide = VueAwesomeSwiper.SwiperSlide
export const useSwiper = VueAwesomeSwiper.useSwiper
export default VueAwesomeSwiper
