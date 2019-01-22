/**
 * @file 响应布局-中间件 / ES module
 * @module middleware/change-page-col
 * @author Surmon <https://github.com/surmon-china>
 */

import systemConstants from '~/constants/system'

export default ({ route, store }) => {

  // columns
  const isTwoColumns = [
    systemConstants.Route.About,
    systemConstants.Route.Project,
    systemConstants.Route.Vlog,
    systemConstants.Route.Sitemap
  ].includes(route.name)

  const isThreeColumns = [
    systemConstants.Route.Music,
    systemConstants.Route.App,
    systemConstants.Route.Service
  ].includes(route.name)
  
  // set columns
  if (store.state.global.isTwoColumns !== isTwoColumns) {
    store.commit('global/updateTwoColumnsState', isTwoColumns)
  }
  
  if (store.state.global.isThreeColumns !== isThreeColumns) {
    store.commit('global/updateThreeColumnsState', isThreeColumns)
  }
}
