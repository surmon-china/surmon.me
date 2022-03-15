/**
 * @file Swiper for vue
 * @module effect.swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import {
  Swiper as SwiperClass,
  Pagination,
  Navigation,
  Grid,
  Lazy,
  Mousewheel,
  Autoplay,
  A11y,
  EffectFade
} from 'swiper'

SwiperClass.use([Grid, Pagination, Navigation, Mousewheel, Autoplay, A11y, Lazy, EffectFade])

export default SwiperClass
export { Swiper, SwiperSlide } from 'swiper/vue'
