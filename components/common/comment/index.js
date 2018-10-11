/**
 * @file Comment box component / ES module
 * @module components/common/comment
 * @author Surmon <https://github.com/surmon-china>
 */

import vueComment from './comment'

const comment = {
  install(Vue) {
    Vue.component('comment-box', vueComment)
  }
}

export default comment
