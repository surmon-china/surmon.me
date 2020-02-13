/**
 * @file 骨架屏模块 / ES module
 * @module components/skeleton
 * @author Surmon <https://github.com/surmon-china>
 */

import SkeletonBase from './base'
import SkeletonLine from './line'
import SkeletonParagraph from './paragraph'

const skeleton = {
  install(Vue) {
    Vue.component(SkeletonBase.name, SkeletonBase)
    Vue.component(SkeletonLine.name, SkeletonLine)
    Vue.component(SkeletonParagraph.name, SkeletonParagraph)
  }
}

export default skeleton
