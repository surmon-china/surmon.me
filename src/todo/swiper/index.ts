/**
 * @file vue-awesome-swiper
 * @module default-export
 * @author Surmon <https://github.com/surmon-china>
 */

import SwiperClass from 'swiper'
import exporter from './exporter'
export * from './constants'

const VueAwesomeSwiper = exporter(SwiperClass)

export const version = VueAwesomeSwiper.version
export const install = VueAwesomeSwiper.install
export const directive = VueAwesomeSwiper.directive
export const Swiper = VueAwesomeSwiper.Swiper
export const SwiperSlide = VueAwesomeSwiper.SwiperSlide
export const useSwiper = VueAwesomeSwiper.useSwiper
export const useSwiperRef = VueAwesomeSwiper.useSwiperRef
export default VueAwesomeSwiper
