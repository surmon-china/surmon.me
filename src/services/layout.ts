/**
 * @file app layout updater
 * @module service/layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouteMeta } from 'vue-router'
import { GlobalState, LayoutColumn } from '/@/state'

export const getLayoutByRouteMeta = (routeMeta: RouteMeta) => {
  return routeMeta.layout === LayoutColumn.Wide
    ? LayoutColumn.Wide
    : routeMeta.layout === LayoutColumn.Full
      ? LayoutColumn.Full
      : routeMeta.layout === LayoutColumn.Page
        ? LayoutColumn.Page
        : LayoutColumn.Normal
}

export const setLayout = (routeMeta: RouteMeta, globalState: GlobalState) => {
  globalState.layoutColumn.setValue(
    getLayoutByRouteMeta(routeMeta)
  )
}
