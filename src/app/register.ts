/**
 * @file App registration
 * @module app/register
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'

import Empty from '/@/components/common/empty.vue'
import Webfont from '/@/components/common/webfont.vue'
import Divider from '/@/components/common/divider.vue'
import Udate from '/@/components/common/udate'
import Ulink from '/@/components/common/ulink'
import Uimage from '/@/components/common/uimage'
import ClientOnly from '/@/components/common/client-only'
import Placeholder from '/@/components/common/placeholder'
import Skeleton from '/@/components/common/skeleton.vue'
import { LoadingIndicator } from '/@/components/common/loading-indicator'
import { Responsive, DesktopOnly } from '/@/components/common/responsive'

import {
  vDisabledWallflower,
  DIRECTIVE_NAME as disabledWallflowerDirectiveName
} from '/@/components/desktop/widgets/wallflower/directive'

export default function (app: App) {
  // directives
  app.directive(disabledWallflowerDirectiveName, vDisabledWallflower)

  // components
  app.component('Webfont', Webfont)
  app.component('Empty', Empty)
  app.component('Udate', Udate)
  app.component('Ulink', Ulink)
  app.component('Uimage', Uimage)
  app.component('Divider', Divider)
  app.component('Placeholder', Placeholder)
  app.component('ClientOnly', ClientOnly)
  app.component('Responsive', Responsive)
  app.component('DesktopOnly', DesktopOnly)
  app.component('LoadingIndicator', LoadingIndicator)
  app.component('Skeleton', Skeleton)
}

declare module 'vue' {
  interface GlobalDirectives {
    vDisabledWallflower: typeof vDisabledWallflower
  }

  interface GlobalComponents {
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
    Skeleton: typeof Skeleton
  }
}
