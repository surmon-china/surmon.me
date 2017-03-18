/**
 * Vue-comment-box
 * @author Surmon.me
 */

const CommentComponent = require('./comment.vue')
const comment = {
  install: function(Vue) {
    Vue.component('comment-box', CommentComponent)
  }
}

module.exports = comment
