/**
 * @file vue-awesome-swiper
 * @module hooks
 * @author Surmon <https://github.com/surmon-china>
 */

import { inject, ref } from 'vue'
import { SwiperSymbol, SwiperContext } from './constants'

export const useSwiper = () => {
  return inject(SwiperSymbol)
}

export const useSwiperRef = () => {
  const swiperContext = ref<SwiperContext>()
  const updateContext = (context: SwiperContext) => {
    swiperContext.value = context
  }
  return [swiperContext, updateContext] as [typeof swiperContext, typeof updateContext]
}
