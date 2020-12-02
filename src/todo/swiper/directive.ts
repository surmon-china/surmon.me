/**
 * @file vue-awesome-swiper
 * @module directive
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, Directive, DirectiveBinding, VNode } from 'vue'
import Swiper, { SwiperOptions } from 'swiper'
import { DEFAULT_CLASSES, SwiperContext, ComponentPropNames } from './constants'
import { IProps, swiperComponentProps } from './swiper'
import { handleClickSlideEvent } from './event'
import { createSwiperContext } from './context'
import { kebabcase, littleCamelCase } from './utils'

interface SwiperElement extends HTMLElement {
  swiper: Swiper
  swiperContext: SwiperContext | undefined
  onForkClick(event: MouseEvent): any
}

export default function getDirective(SwiperClass: typeof Swiper, globalOptions?: SwiperOptions): Directive<SwiperElement> {

  const componentPropValueMap = Object.keys(swiperComponentProps).reduce(
    (map, key) => ({ ...map, [key]: swiperComponentProps[key].default })
  , {})

  const getSwipeOptions = (binding: DirectiveBinding): SwiperOptions => {
    return binding.value || globalOptions
  }

  // Set/Get swiper context/instance in directive by element attr
  const setElementSwiper = (element: SwiperElement, swiperContext: SwiperContext) => {
    element.swiperContext = swiperContext
    element.swiper = element.swiper || swiperContext?.$swiper.value
  }
  const getSwiperContext = (element: SwiperElement) => {
    return element.swiperContext
  }
  const getSwiperInstance = (element: SwiperElement) => {
    return element.swiper || getSwiperContext(element)?.$swiper.value
  }

  const isTrueValueByInput = (input: any): boolean => {
    return [true, undefined, null, ''].includes(input)
  }

  const getStandardProps = (vnode: VNode) => {
    const props = { ...componentPropValueMap, ...vnode.props }
    Object.keys(props).forEach(key => {
      const value = props[key]
      const littleCamelCaseName = littleCamelCase(key)
      if (value !== undefined && key !== littleCamelCaseName) {
        props[littleCamelCaseName] = value
      }
    })
    return props
  }

  const getStandardPropGetter = (vnode: VNode) => {
    return <V = any>(key: string): V => {
      const props = getStandardProps(vnode)
      const value = props[key]
      return value !== undefined
        ? value
        : props[kebabcase(key)]
    }
  }

  // Emit event in Vue directive
  const getEventEmiter = (vnode: VNode) => {
    return (name: string, ...args: any[]) => {
      const eventName = name.replace(/^\S/, s => 'on' + s.toUpperCase())
      const getProp = getStandardPropGetter(vnode)
      const handler = getProp(eventName)
      handler?.(...args)
    }
  }

  return {
    // Init
    beforeMount(element, _, vnode) {
      // auto class name
      if (element.className.indexOf(DEFAULT_CLASSES.containerClass) === -1) {
        element.className += ((element.className ? ' ' : '') + DEFAULT_CLASSES.containerClass)
      }
      // bind click event
      element.onForkClick = event => {
        const swiper = getSwiperInstance(element)
        if (swiper) {
          const eventEmiter = getEventEmiter(vnode)
          handleClickSlideEvent(swiper, event, eventEmiter)
        }
      }
      element.addEventListener('click', element.onForkClick)
    },
    // DOM inserted
    mounted(element, binding, vnode) {
      const swiperOptions = getSwipeOptions(binding)
      const eventEmiter = getEventEmiter(vnode)
      const props = getStandardProps(vnode)
      const swiperContext: SwiperContext = createSwiperContext({
        SwiperClass,
        props: props as IProps,
        options: ref(swiperOptions),
        element: () => element,
        emiter: eventEmiter,
        autoCaseSwiperEvent: false
      })
      swiperContext.init()
      setElementSwiper(element, swiperContext)
    },
    // On options changed or DOM updated
    updated(element, binding, vnode) {
      const getProp = getStandardPropGetter(vnode)
      const autoUpdate = getProp<boolean>(ComponentPropNames.AutoUpdate)
      if (isTrueValueByInput(autoUpdate)) {
        const swiper = getSwiperInstance(element)
        if (swiper) {
          const swiperOptions = getSwipeOptions(binding)
          const isLoop = swiperOptions.loop
          if (isLoop) {
            (swiper as any)?.loopDestroy?.()
          }
          swiper?.update?.()
          swiper.navigation?.update?.()
          swiper.pagination?.render?.()
          swiper.pagination?.update?.()
          if (isLoop) {
            (swiper as any)?.loopCreate?.()
            swiper?.update?.()
          }
        }
      }
    },
    // Destroy this directive
    beforeUnmount(element, _, vnode) {
      const getProp = getStandardPropGetter(vnode)
      const autoDestroy = getProp<boolean>(ComponentPropNames.AutoDestroy)
      if (isTrueValueByInput(autoDestroy)) {
        const swiper = getSwiperInstance(element)
        if (swiper && (swiper as any).initialized) {
          element.removeEventListener('click', element.onForkClick)
          swiper?.destroy?.(
            isTrueValueByInput(getProp(ComponentPropNames.DeleteInstanceOnDestroy)),
            isTrueValueByInput(getProp(ComponentPropNames.CleanupStylesOnDestroy))
          )
        }
      }
    }
  }
}
