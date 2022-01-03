/**
 * @file Swiper for vue
 * @module service.swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import {
  Swiper as SwiperClass,
  Pagination,
  Navigation,
  Lazy,
  Mousewheel,
  Autoplay,
  A11y,
  EffectFade
} from 'swiper'
export { Swiper, SwiperSlide } from 'swiper/vue'

SwiperClass.use([Pagination, Navigation, Mousewheel, Autoplay, A11y, Lazy, EffectFade])

export default SwiperClass
