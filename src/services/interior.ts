/**
 * @file Vue enhancer
 * @module plugins/vue-extends
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import Uimage from '/@/components/common/uimage'
import Placeholder from '/@/components/common/placeholder'
import Spin from '/@/components/common/spin.vue'
import Empty from '/@/components/common/empty.vue'
import Masonry from '/@/components/common/masonry.vue'

import SkeletonBase from '/@/components/common/skeleton/base.vue'
import SkeletonLine from '/@/components/common/skeleton/line.vue'
import SkeletonParagraph from '/@/components/common/skeleton/paragraph.vue'

import { Responsive, DesktopOnly } from '/@/components/common/responsive'

export default function (app: App) {
  // components
  app.component(Uimage.name, Uimage)
  app.component(Spin.name as string, Spin)
  app.component(Empty.name as string, Empty)
  app.component(Masonry.name as string, Masonry)
  app.component(Placeholder.name, Placeholder)

  app.component(Responsive.name, Responsive)
  app.component(DesktopOnly.name, DesktopOnly)

  app.component(SkeletonBase.name as string, SkeletonBase)
  app.component(SkeletonLine.name as string, SkeletonLine)
  app.component(SkeletonParagraph.name as string, SkeletonParagraph)
}
