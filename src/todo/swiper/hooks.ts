/**
 * @file vue-awesome-swiper
 * @module hooks
 * @author Surmon <https://github.com/surmon-china>
 */

import { inject } from 'vue'
import { SwiperSymbol } from './constants'

export const useSwiper = () => {
  return inject(SwiperSymbol)
}
