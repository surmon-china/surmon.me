/**
 * @file app layout updater
 * @module service/layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { NavigationGuard } from 'vue-router'
import { GlobalState, LayoutColumn } from '/@/state'

export const getLayoutMiddleware = (globalState: GlobalState) => {
  const middleware: NavigationGuard = (to, _, next) => {
    globalState.layoutColumn.setValue(
      to.meta.layout === LayoutColumn.Wide
        ? LayoutColumn.Wide
        : to.meta.layout === LayoutColumn.Full
          ? LayoutColumn.Full
          : to.meta.layout === LayoutColumn.Page
            ? LayoutColumn.Page
            : LayoutColumn.Normal
    )

    next()
  }
  return middleware
}
