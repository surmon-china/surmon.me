/**
 * Vue-comment-hidden-box
 * @author Surmon.me
 */

const CommentHiddenComponent = require('./comment.vue')
const comment = {
  install: function(Vue) {
    Vue.component('comment-hidden-box', CommentHiddenComponent)
  }
}
module.exports = comment