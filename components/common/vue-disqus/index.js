/**
 * Vue-disqus
 * @author Surmon.me
 */

const DisqusComponent = require('./disqus.vue')

const disqus = {
  install: function(Vue) {
    Vue.component('disqus-box', DisqusComponent)
  }
}
module.exports = disqus
