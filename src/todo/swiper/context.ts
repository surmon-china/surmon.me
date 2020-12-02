/**
 * @file vue-awesome-swiper
 * @module context
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, readonly, isReadonly, Ref } from 'vue'
import Swiper, { SwiperOptions } from 'swiper'
import { SwiperContext, ComponentPropNames, ComponentEvents } from './constants'
import { bindSwiperEvents, EventEmiter } from './event'
import { IProps } from './swiper'

export interface ICreateSwiperContextConfig {
  SwiperClass: typeof Swiper
  options: Ref<SwiperOptions>
  props: IProps
  element(): HTMLElement
  emiter: EventEmiter
  autoCaseSwiperEvent: boolean
}

export const createSwiperContext = (config: ICreateSwiperContextConfig): SwiperContext => {
  const eventEmiter = config.emiter
  const swiperProps = config.props
  const swiperOptions = config.options
  const swiperInstance = ref<Swiper | null>(null)
  // eslint-disable-next-line prefer-const
  let swiperContext: SwiperContext

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
    if (swiperProps[ComponentPropNames.AutoUpdate] && swiperInstance.value) {
      reLoopSwiper()
      swiperInstance.value?.update?.()
      swiperInstance.value.navigation?.update?.()
      swiperInstance.value.pagination?.render?.()
      swiperInstance.value.pagination?.update?.()
    }
  }

  const destroySwiper = () => {
    if (swiperProps[ComponentPropNames.AutoDestroy] && swiperInstance.value) {
      // https://github.com/surmon-china/vue-awesome-swiper/pull/341
      // https://github.com/surmon-china/vue-awesome-swiper/issues/340
      if ((swiperInstance.value as any).initialized) {
        swiperInstance.value?.destroy?.(
          swiperProps[ComponentPropNames.DeleteInstanceOnDestroy],
          swiperProps[ComponentPropNames.CleanupStylesOnDestroy]
        )
      }
    }
  }

  const initSwiper = (force?: boolean) => {
    if (
      !force &&
      swiperInstance.value &&
      (swiperInstance.value as any).initialized
    ) {
      return
    }
    swiperInstance.value = new config.SwiperClass(
      config.element(),
      swiperOptions.value
    )
    bindSwiperEvents(
      swiperInstance.value,
      eventEmiter,
      config.autoCaseSwiperEvent
    )
    eventEmiter(
      ComponentEvents.Ready,
      swiperContext
    )
  }

  swiperContext = Object.freeze({
    $swiper: swiperInstance,
    options: swiperOptions,
    __props: swiperProps,
    init: initSwiper,
    update: updateSwiper,
    reLoop: reLoopSwiper,
    destroy: destroySwiper
  } as SwiperContext)

  return swiperContext
}
