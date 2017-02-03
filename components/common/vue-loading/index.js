/**
 * Vue-loading
 * @author Surmon.me
 */

const LoadingComponent = require('./loading.vue')
const loading = {
  install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
}
module.exports = loading