/**
 * @file Comment box component / ES module
 * @module components/common/comment
 * @author Surmon <https://github.com/surmon-china>
 */

import Comment from './main'

export const comment = {
  install(Vue) {
    Vue.component('comment-box', Comment)
  }
}

export default comment
