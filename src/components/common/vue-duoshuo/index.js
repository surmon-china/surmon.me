/**
 * Vue-duoshuo
 * @author Surmon.me
 */

const DuoshuoComponent = require('./duoshuo.vue')
const includeDuoshuo = function(unstable) {
  var duoshuoSrc = '//static.duoshuo.com/embed.js'
  if (unstable) duoshuoSrc = '//static.duoshuo.com/embed.unstable.js'
  var ds = document.createElement('script');
      ds.type = 'text/javascript';
      ds.async = true;
      ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + duoshuoSrc;
      ds.charset = 'UTF-8';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
}
var unstable = false
const duoshuo = {
  config: function(configs) {
    if (!configs) return
    if (configs.shortName) window.duoshuoQuery = { short_name: configs.shortName }
    if (configs.unstable) unstable = configs.unstable
  },
  install: function(Vue) {
    includeDuoshuo(unstable)
    Vue.component('duoshuo', DuoshuoComponent)
  }
}
module.exports = duoshuo
