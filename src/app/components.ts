/**
 * @file App components
 * @module app.component
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import Webfont from '/@/components/common/webfont.vue'
import Spin from '/@/components/common/spin.vue'
import Empty from '/@/components/common/empty.vue'
import Divider from '/@/components/common/divider.vue'
import Udate from '/@/components/common/udate'
import Ulink from '/@/components/common/ulink'
import Uimage from '/@/components/common/uimage'
import Placeholder from '/@/components/common/placeholder'
import ClientOnly from '/@/components/common/client-only'
import Container from '/@/components/common/container'
import { LoadingIndicator } from '/@/components/common/loading-indicator'
import { Responsive, DesktopOnly } from '/@/components/common/responsive'

import SkeletonBase from '/@/components/common/skeleton/base.vue'
import SkeletonLine from '/@/components/common/skeleton/line.vue'
import SkeletonParagraph from '/@/components/common/skeleton/paragraph.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Spin: typeof Spin
    Empty: typeof Empty
    Webfont: typeof Webfont
    Divider: typeof Divider
    Udate: typeof Udate
    Ulink: typeof Ulink
    Uimage: typeof Uimage
    Placeholder: typeof Placeholder
    ClientOnly: typeof ClientOnly
    Responsive: typeof Responsive
    DesktopOnly: typeof DesktopOnly
    LoadingIndicator: typeof LoadingIndicator
    Container: typeof Container
    SkeletonBase: typeof SkeletonBase
    SkeletonLine: typeof SkeletonLine
    SkeletonParagraph: typeof SkeletonParagraph
  }
}

export default function (app: App) {
  app.component('Webfont', Webfont)
  app.component('Spin', Spin)
  app.component('Empty', Empty)
  app.component('Divider', Divider)
  app.component('Udate', Udate)
  app.component('Ulink', Ulink)
  app.component('Uimage', Uimage)
  app.component('Placeholder', Placeholder)
  app.component('LoadingIndicator', LoadingIndicator)

  app.component('ClientOnly', ClientOnly)
  app.component('Responsive', Responsive)
  app.component('DesktopOnly', DesktopOnly)
  app.component('Container', Container)

  app.component('SkeletonBase', SkeletonBase)
  app.component('SkeletonLine', SkeletonLine)
  app.component('SkeletonParagraph', SkeletonParagraph)
}
