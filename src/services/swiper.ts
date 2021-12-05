/**
 * @file swiper for vue
 * @module service.swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay, A11y } from 'swiper'
export { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/a11y'
import 'swiper/scss/autoplay'
import 'swiper/scss/mousewheel'
import 'swiper/scss/manipulation'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperClass.use([Pagination, Navigation, Mousewheel, Autoplay, A11y])

export default SwiperClass
