/**
 * @file Empty box component / ES module
 * @module components/common/empty
 * @author Surmon <https://github.com/surmon-china>
 */

import EmptyComponent from './empty'

const empty = {
  install(Vue) {
    Vue.component(EmptyComponent.name, EmptyComponent)
  }
}

export default empty
