/**
 * @file Vue-empty component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

const EmptyComponent = require('./empty.vue')
const empty = {
  install: function(Vue) {
    Vue.component('empty-box', EmptyComponent.default || EmptyComponent)
  }
}

export default empty
