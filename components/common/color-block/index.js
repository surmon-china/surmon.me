/**
 * @file Color block component / ES module
 * @module components/common/color-block
 * @author Surmon <https://github.com/surmon-china>
 */

import ColorBlockComponent from './block'

const colorBlock = {
  install(Vue) {
    Vue.component(ColorBlockComponent.name, ColorBlockComponent)
  }
}

export default colorBlock
