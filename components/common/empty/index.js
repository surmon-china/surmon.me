/**
 * @file Empty box component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

import EmptyComponent from './empty'

const empty = {
  install(Vue) {
    Vue.component(EmptyComponent.name, EmptyComponent)
  }
}

export default empty
