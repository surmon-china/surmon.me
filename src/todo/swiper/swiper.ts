/**
 * @file vue-awesome-swiper
 * @module SwiperComponent
 * @author Surmon <https://github.com/surmon-china>
 */

import Swiper, { SwiperOptions } from 'swiper'
import {
  defineComponent,
  ref,
  computed,
  h,
  onMounted,
  onUpdated,
  onActivated,
  onBeforeUnmount,
  nextTick,
  provide,
  PropType,
  ExtractPropTypes
} from 'vue'
import {
  DEFAULT_CLASSES,
  SwiperSymbol,
  SwiperContext,
  NameId,
  ComponentPropNames
} from './constants'
import { handleClickSlideEvent } from './event'
import { createSwiperContext } from './context'

enum SlotNames {
  ParallaxBg = 'parallax-bg',
  Pagination = 'pagination',
  Scrollbar = 'scrollbar',
  PrevButton = 'button-prev',
  NextButton = 'button-next'
}

export const swiperOptionProps = {
  defaultOptions: {
    type: Object as PropType<SwiperOptions>,
    required: false,
    default: () => ({} as SwiperOptions)
  },
  // eslint-disable-next-line vue/require-default-prop
  options: {
    type: Object as PropType<SwiperOptions>,
    required: false
  }
}

export const swiperComponentProps = {
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

export const props = {
  ...swiperOptionProps,
  ...swiperComponentProps
}

export type SwiperComponent = ReturnType<typeof getSwiperComponent>
export type SwiperComponentInstance = InstanceType<SwiperComponent>
export type IProps = ExtractPropTypes<typeof props>
export default function getSwiperComponent(SwiperClass: typeof Swiper) {
  return defineComponent({
    name: NameId.SwiperComponent,
    props: props,
    setup(props, context) {
      const eventEmiter = context.emit
      const swiperElement = ref<HTMLElement>(null as any as HTMLElement)
      const swiperOptions = computed(() => props.options || props.defaultOptions)
      const wrapperClass = computed(
        () => swiperOptions.value?.wrapperClass || DEFAULT_CLASSES.wrapperClass
      )
      const swiperContext: SwiperContext = createSwiperContext({
        SwiperClass,
        props,
        options: swiperOptions,
        element: () => swiperElement.value,
        emiter: eventEmiter,
        autoCaseSwiperEvent: true
      })
      const swiperInstance = swiperContext.$swiper

      // Feature: click event
      const handleSwiperClick = (event: MouseEvent) => {
        if (swiperInstance.value) {
          handleClickSlideEvent(swiperInstance.value, event, eventEmiter)
        }
      }

      onMounted(() => {
        if (!swiperInstance.value) {
          swiperContext.init()
        }
      })

      // Update swiper when the parent component activated with `keep-alive`.
      onUpdated(swiperContext.update)
      onActivated(swiperContext.update)
      onBeforeUnmount(() => {
        // https://github.com/surmon-china/vue-awesome-swiper/commit/2924a9d4d3d1cf51c0d46076410b1f804b2b8a43#diff-7f4e0261ac562c0f354cb91a1ca8864f
        nextTick(swiperContext.destroy)
      })

      // Provide context to childen
      provide(SwiperSymbol, swiperContext)

      return () => {
        return h(
          'div',
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
