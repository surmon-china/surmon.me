 /**
 * @file Loading component / ES module
 * @module components/common/loading
 * @author Surmon <https://github.com/surmon-china>
 */

import LoadingComponent from './loading'

const loading = {
  install(Vue) {
    Vue.component(LoadingComponent.name, LoadingComponent)
  }
}

export default loading
