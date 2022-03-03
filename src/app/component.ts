/**
 * @file App components
 * @module app.component
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import Spin from '/@/components/common/spin.vue'
import Empty from '/@/components/common/empty.vue'
import Divider from '/@/components/common/divider.vue'
import Udate from '/@/components/common/udate'
import Ulink from '/@/components/common/ulink'
import Uimage from '/@/components/common/uimage'
import Placeholder from '/@/components/common/placeholder'

import SkeletonBase from '/@/components/common/skeleton/base.vue'
import SkeletonLine from '/@/components/common/skeleton/line.vue'
import SkeletonParagraph from '/@/components/common/skeleton/paragraph.vue'

import { Responsive, DesktopOnly } from '/@/components/common/responsive'
import { ClientOnly } from '/@/components/common/client-only'

export default function (app: App) {
  app.component(Spin.name as string, Spin)
  app.component(Empty.name as string, Empty)
  app.component(Divider.name as string, Divider)
  app.component(Udate.name, Udate)
  app.component(Ulink.name, Ulink)
  app.component(Uimage.name, Uimage)
  app.component(Placeholder.name, Placeholder)

  app.component(ClientOnly.name, ClientOnly)
  app.component(Responsive.name, Responsive)
  app.component(DesktopOnly.name, DesktopOnly)

  app.component(SkeletonBase.name as string, SkeletonBase)
  app.component(SkeletonLine.name as string, SkeletonLine)
  app.component(SkeletonParagraph.name as string, SkeletonParagraph)
}
