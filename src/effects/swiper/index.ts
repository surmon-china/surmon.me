/**
 * @file Swiper for vue
 * @module effect.swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Swiper as SwiperClass } from 'swiper'
import { Autoplay, Mousewheel, Grid, EffectFade } from 'swiper/modules'

SwiperClass.use([Autoplay, Mousewheel, Mousewheel, Grid, EffectFade])

export default SwiperClass
export { Swiper, SwiperSlide } from 'swiper/vue'
