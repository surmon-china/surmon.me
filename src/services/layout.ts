/**
 * @file App layout updater
 * @module service.layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouteMeta } from 'vue-router'

export enum LayoutColumn {
  Normal = 0,
  Wide = 1, // 3 column
  Full = 2 // full page
}

export const getLayoutByRouteMeta = (routeMeta: RouteMeta) => {
  return routeMeta.layout === LayoutColumn.Wide
    ? LayoutColumn.Wide
    : routeMeta.layout === LayoutColumn.Full
    ? LayoutColumn.Full
    : LayoutColumn.Normal
}
