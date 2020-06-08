/**
 * @file vue-awesome-swiper
 * @module SwiperSlideComponent
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, inject, InjectionKey, h } from 'vue'
import { SwiperSymbol, CoreNames, DEFAULT_CLASSES, ComponentPropNames } from './constants'
import { SwiperComponent } from './swiper'

const test: InjectionKey<string> = Symbol()

export default defineComponent({
  name: CoreNames.SwiperSlideComponent,
  setup() {
    const swiperUpdater = inject(SwiperSymbol)
    // swiperUpdater?.[CoreNames.SwiperInstance]
  },
  // inject: [SwiperSymbol],
  computed: {
    slideClass(): string {
      return (this.$parent)?.swiperOptions?.slideClass || DEFAULT_CLASSES.slideClass
    }
  },
  methods: {
    update() {
      const parent = this.$parent
      // https://github.com/surmon-china/vue-awesome-swiper/issues/632
      if (parent[ComponentPropNames.AutoUpdate]) {
        parent?.swiperInstance?.update()
      }
    }
  },
  mounted() {
    this.update()
  },
  onUpdated() {
    this.update()
  },
  render() {
    return h(
      'div',
      {
        class: this.slideClass
      },
      this.$slots.default
    )
  }
})
