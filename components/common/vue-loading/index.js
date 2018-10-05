 /**
 * @file Vue-loading component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

const LoadingComponent = require('./loading.vue')
const loading = {
  install: function(Vue) {
    Vue.component('loading-box', LoadingComponent.default || LoadingComponent)
  }
}

export default loading
