/**
 * @file swiper for vue
 * @module service.swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import { Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay, A11y } from 'swiper'
export { Swiper, SwiperSlide } from 'swiper/vue'

SwiperClass.use([Pagination, Navigation, Mousewheel, Autoplay, A11y])

export default SwiperClass
