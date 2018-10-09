 /**
 * @file Vue-loading component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

import LoadingComponent from './loading'

const loading = {
  install(Vue) {
    Vue.component(LoadingComponent.name, LoadingComponent)
  }
}

export default loading
