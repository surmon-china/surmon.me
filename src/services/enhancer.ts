/**
 * @file Vue enhancer
 * @module plugins/vue-extends
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import Uimage from '/@/components/common/uimage'

// import EmptyBox from '/@/components/common/empty'
// import LoadingBox from '/@/components/common/loading'
// import CommentBox from '/@/components/common/comment'
// import SkeletonBox from '/@/components/common/skeleton'

export default function (app: App) {
  // components
  app.component(Uimage.name, Uimage)

  // Vue.component(EmptyBox.name, EmptyBox)
  // Vue.component(LoadingBox.name, LoadingBox)
  // TODO: 评论框不再全局注册
  // Vue.use(CommentBox)
  // Vue.use(SkeletonBox)
}
