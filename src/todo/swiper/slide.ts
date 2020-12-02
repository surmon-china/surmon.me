/**
 * @file vue-awesome-swiper
 * @module SwiperSlideComponent
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, computed, h, onMounted, onUpdated } from 'vue'
import { NameId, SwiperContext, DEFAULT_CLASSES, ComponentPropNames } from './constants'
import { useSwiper } from './hooks'

export default defineComponent({
  name: NameId.SwiperSlideComponent,
  setup(_, context) {
    const swiperContext = useSwiper() as SwiperContext
    const slideClass = computed(() => swiperContext?.options.value.slideClass || DEFAULT_CLASSES.slideClass)
    // https://github.com/surmon-china/vue-awesome-swiper/issues/632
    const updateOfSwiperInstance = () => {
      if (swiperContext?.__props?.[ComponentPropNames.AutoUpdate]) {
        swiperContext?.$swiper.value?.update()
      }
    }

    onMounted(updateOfSwiperInstance)
    onUpdated(updateOfSwiperInstance)

    return () => h('div', { class: slideClass.value }, context.slots.default?.())
  }
})
