/**
 * @file vue-awesome-swiper
 * @module exporter
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin } from 'vue'
import Swiper, { SwiperOptions } from 'swiper'
import { NameId } from './constants'
import getDirective from './directive'
import getSwiperComponent from './swiper'
import SwiperSlideComponent from './slide'
import { useSwiper, useSwiperRef } from './hooks'

type InstallFunction = Plugin & {
  installed?: boolean
}

const getInstaller = (SwiperClass: typeof Swiper) => {
  const install: InstallFunction = (app: App, globalOptions?: SwiperOptions) => {
    if (install.installed) return

    const SwiperComponent = getSwiperComponent(SwiperClass)
    if (globalOptions) {
      SwiperComponent.props.defaultOptions.default = () => globalOptions
    }
  
    app.component(SwiperComponent.name, SwiperComponent)
    app.component(SwiperSlideComponent.name, SwiperSlideComponent)
    // app.directive(CoreNames.SwiperDirective, getDirective(SwiperClass, globalOptions))
    install.installed = true
  }
  return install
}

export default function exporter(SwiperClass: typeof Swiper) {
  return {
    useSwiper,
    useSwiperRef,
    version: 'PACKAGE_VERSION',
    install: getInstaller(SwiperClass),
    directive: getDirective(SwiperClass),
    [NameId.SwiperComponent as const]: getSwiperComponent(SwiperClass),
    [NameId.SwiperSlideComponent as const]: SwiperSlideComponent
  }
}
