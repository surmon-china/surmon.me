/**
 * Vue-duoshuo
 * @author Surmon.me
 */

const DuoshuoComponent = require('./duoshuo.vue')

const duoshuo = {
  install: function(Vue) {
    Vue.component('duoshuo-box', DuoshuoComponent)
  }
}
module.exports = duoshuo
