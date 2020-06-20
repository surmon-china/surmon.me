import { NavigationGuard } from 'vue-router'
import { GlobalState, LayoutColumn } from '/@/state'
import { RouteName } from '/@/router'

export const getLayoutMiddleware = (globalState: GlobalState) => {
  const middleware: NavigationGuard = (from, to, next) => {
    const isFullColumns = [
      RouteName.About,
      RouteName.Vlog,
      RouteName.Sitemap
    ].includes((to.name || '') as RouteName)

    const isFullPageColumns = [
      RouteName.Music,
      RouteName.App,
      RouteName.Service
    ].includes((to.name || '') as RouteName)

    globalState.layoutColumn.setLayoutColumn(
      isFullColumns
        ? LayoutColumn.Full
        : isFullPageColumns
          ? LayoutColumn.Page
          : LayoutColumn.Normal
    )

    console.log('-------------------', from, to)
    next()
  }
  return middleware
}
