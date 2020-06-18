/**
 * @file Vue enhancer
 * @module plugins/vue-extends
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import Uimage from '/@/components/common/uimage'
import Empty from '/@/components/common/empty/base.vue'
import AutoEmpty from '/@/components/common/empty/auto'
// import LoadingBox from '/@/components/common/loading'
// import SkeletonBox from '/@/components/common/skeleton'

export default function (app: App) {
  // components
  app.component(Uimage.name, Uimage)
  app.component(Empty.name as string, Empty)
  app.component(AutoEmpty.name, AutoEmpty)

  // Vue.component(LoadingBox.name, LoadingBox)
  // Vue.use(SkeletonBox)
}
