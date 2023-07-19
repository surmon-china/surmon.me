/**
 * @file Swiper for vue
 * @module effect.swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Swiper as SwiperClass } from 'swiper'
import { Pagination, Navigation, Grid, Mousewheel, Autoplay, A11y, EffectFade } from 'swiper/modules'

SwiperClass.use([Grid, Pagination, Navigation, Mousewheel, Autoplay, A11y, EffectFade])

export default SwiperClass
export { Swiper, SwiperSlide } from 'swiper/vue'
