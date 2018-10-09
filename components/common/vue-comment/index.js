/**
 * @file Vue-comment-box component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

import vueComment from './comment'

const comment = {
  install(Vue) {
    Vue.component('comment-box', vueComment)
  }
}

export default comment
