/**
 * Vue-empty
 * @author Surmon.me
 */

const EmptyComponent = require('./empty.vue')
const empty = {
  install: function(Vue) {
    Vue.component('empty-box', EmptyComponent.default || EmptyComponent)
  }
}

module.exports = empty
