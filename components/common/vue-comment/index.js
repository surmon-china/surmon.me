/**
 * @file Vue-comment-box component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

const vueComment = require('./comment.vue')
const comment = {
  install: function(Vue) {
    Vue.component('comment-box', vueComment.default || vueComment)
  }
}

export default comment
