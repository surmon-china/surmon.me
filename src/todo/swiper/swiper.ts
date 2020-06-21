/**
 * @file vue-awesome-swiper
 * @module SwiperComponent
 * @author Surmon <https://github.com/surmon-china>
 */

import Swiper, { SwiperOptions } from 'swiper'
import { defineComponent, ref, computed, h, onMounted, onUpdated, onActivated, onBeforeUnmount, nextTick, provide, readonly, PropType, ExtractPropTypes } from 'vue'
import { DEFAULT_CLASSES, SwiperSymbol, SwiperContext, NameId, ComponentPropNames, ComponentEvents } from './constants'
import { handleClickSlideEvent, bindSwiperEvents } from './event'

enum SlotNames {
  ParallaxBg = 'parallax-bg',
  Pagination = 'pagination',
  Scrollbar = 'scrollbar',
  PrevButton = 'button-prev',
  NextButton = 'button-next'
}

const swiperComponentProps = {
  defaultOptions: {
    type: Object as PropType<SwiperOptions>,
    required: false,
    default: () => ({}) as SwiperOptions
  },
  // eslint-disable-next-line vue/require-default-prop
  options: {
    type: Object as PropType<SwiperOptions>,
    required: false
  },
  [ComponentPropNames.AutoUpdate]: {
    type: Boolean,
    default: true
  },
  // https://github.com/surmon-china/vue-awesome-swiper/pull/550/files
  [ComponentPropNames.AutoDestroy]: {
    type: Boolean,
    default: true
  },
  // https://github.com/surmon-china/vue-awesome-swiper/pull/388
  [ComponentPropNames.DeleteInstanceOnDestroy]: {
    type: Boolean,
    required: false,
    default: true
  },
  [ComponentPropNames.CleanupStylesOnDestroy]: {
    type: Boolean,
    required: false,
    default: true
  }
}

export type SwiperComponent = ReturnType<typeof getSwiperComponent>
export type SwiperComponentInstance = InstanceType<SwiperComponent>
export type SwiperComponentProps = ExtractPropTypes<typeof swiperComponentProps>
export default function getSwiperComponent(SwiperClass: typeof Swiper) {
  return defineComponent({
    name: NameId.SwiperComponent,
    props: swiperComponentProps,
    setup(props, context) {
      // eslint-disable-next-line prefer-const
      let swiperContext!: SwiperContext
      const emiter = context.emit
      const swiperElement = ref<HTMLElement>(null as any as HTMLElement)
      const swiperInstance = ref<Swiper | null>(null)
      const swiperOptions = computed(() => props.options || props.defaultOptions)
      const wrapperClass = computed(() => swiperOptions.value?.wrapperClass || DEFAULT_CLASSES.wrapperClass)

      // Feature: click event
      const handleSwiperClick = (event: MouseEvent) => {
        if (swiperInstance.value) {
          handleClickSlideEvent(
            swiperInstance.value,
            event,
            emiter
          )
        }
      }

      const reLoopSwiper = () => {
        if (swiperInstance.value && swiperOptions.value.loop) {
          // https://github.com/surmon-china/vue-awesome-swiper/issues/593
          // https://github.com/surmon-china/vue-awesome-swiper/issues/544
          // https://github.com/surmon-china/vue-awesome-swiper/pull/545/files
          const swiper = swiperInstance.value as any
          swiper?.loopDestroy?.()
          swiper?.loopCreate?.()
        }
      }

      const updateSwiper = () => {
        if (this[ComponentPropNames.AutoUpdate] && swiperInstance.value) {
          reLoopSwiper()
          swiperInstance.value?.update?.()
          swiperInstance.value.navigation?.update?.()
          swiperInstance.value.pagination?.render?.()
          swiperInstance.value.pagination?.update?.()
        }
      }

      const destroySwiper = () => {
        if (this[ComponentPropNames.AutoDestroy] && swiperInstance.value) {
          // https://github.com/surmon-china/vue-awesome-swiper/pull/341
          // https://github.com/surmon-china/vue-awesome-swiper/issues/340
          if ((swiperInstance.value as any).initialized) {
            swiperInstance.value?.destroy?.(
              props[ComponentPropNames.DeleteInstanceOnDestroy] as boolean,
              props[ComponentPropNames.CleanupStylesOnDestroy] as boolean
            )
          }
        }
      }

      const initSwiper = () => {
        swiperInstance.value = new SwiperClass(
          swiperElement.value,
          swiperOptions.value
        )
        bindSwiperEvents(
          swiperInstance.value,
          emiter
        )
        emiter(
          ComponentEvents.Ready,
          swiperContext
        )
      }

      swiperContext = Object.freeze({
        $swiper: readonly(swiperInstance),
        options: swiperOptions,
        props,
        init: initSwiper,
        update: updateSwiper,
        reLoop: reLoopSwiper,
        destroy: destroySwiper
      })

      onMounted(() => {
        if (!swiperInstance.value) {
          initSwiper()
        }
      })

      // Update swiper when the parent component activated with `keep-alive`.
      onActivated(updateSwiper)
      onUpdated(updateSwiper)
      onBeforeUnmount(() => {
        // https://github.com/surmon-china/vue-awesome-swiper/commit/2924a9d4d3d1cf51c0d46076410b1f804b2b8a43#diff-7f4e0261ac562c0f354cb91a1ca8864f
        nextTick(destroySwiper)
      })

      // Provide context to childen
      provide(SwiperSymbol, swiperContext)

      return () => {
        return h('div',
          {
            class: DEFAULT_CLASSES.containerClass,
            ref: swiperElement,
            onClick: handleSwiperClick
          },
          [
            context.slots[SlotNames.ParallaxBg]?.(),
            h('div', { class: wrapperClass.value }, context.slots.default?.()),
            context.slots[SlotNames.Pagination]?.(),
            context.slots[SlotNames.PrevButton]?.(),
            context.slots[SlotNames.NextButton]?.(),
            context.slots[SlotNames.Scrollbar]?.()
          ]
        )
      }
    }
  })
}
