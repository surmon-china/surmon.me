/**
 * @file Color block component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

import ColorBlockComponent from './block'

const colorBlock = {
  install(Vue) {
    Vue.component(ColorBlockComponent.name, ColorBlockComponent)
  }
}

export default colorBlock
