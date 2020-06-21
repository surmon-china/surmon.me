/**
 * @file vue-awesome-swiper
 * @module constants
 * @author Surmon <https://github.com/surmon-china>
 */

import { InjectionKey, Ref } from 'vue'
import Swiper, { SwiperOptions, CommonEvent } from 'swiper'
import { SwiperComponentProps } from './swiper'

export enum NameId {
  SwiperComponent = 'Swiper',
  SwiperSlideComponent = 'SwiperSlide',
  SwiperDirective = 'swiper',
  SwiperInstance = '$swiper'
}

export interface SwiperContext {
  readonly $swiper: Ref<Swiper | null>
  readonly options: Ref<SwiperOptions>
  readonly props: SwiperComponentProps
  readonly init: () => void
  readonly update: () => void
  readonly reLoop: () => void
  readonly destroy: () => void
}

export const SwiperSymbol: InjectionKey<SwiperContext> = Symbol('swiper')

export type SwiperClassKey = keyof typeof DEFAULT_CLASSES
export const DEFAULT_CLASSES = Object.freeze({
  containerClass: 'swiper-container',
  wrapperClass: 'swiper-wrapper',
  slideClass: 'swiper-slide'
})

export enum ComponentEvents {
  Ready = 'ready',
  ClickSlide = 'clickSlide',
}

export enum ComponentPropNames {
  AutoUpdate = 'autoUpdate',
  AutoDestroy = 'autoDestroy',
  DeleteInstanceOnDestroy = 'deleteInstanceOnDestroy',
  CleanupStylesOnDestroy = 'cleanupStylesOnDestroy'
}

// https://swiperjs.com/api/#events
export const SWIPER_EVENTS: CommonEvent[] = [
  'init',
  'beforeDestroy',
  'slideChange',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
  'slideNextTransitionStart',
  'slideNextTransitionEnd',
  'slidePrevTransitionStart',
  'slidePrevTransitionEnd',
  'transitionStart',
  'transitionEnd',
  'touchStart',
  'touchMove',
  'touchMoveOpposite',
  'sliderMove',
  'touchEnd',
  'click',
  'tap',
  'doubleTap',
  'imagesReady',
  'progress',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'setTranslate',
  'setTransition',
  'resize',
  'observerUpdate' as CommonEvent,
  'beforeLoopFix' as CommonEvent,
  'loopFix' as CommonEvent
]
