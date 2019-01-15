/**
 * @file 响应布局-中间件 / ES module
 * @module middleware/change-page-col
 * @author Surmon <https://github.com/surmon-china>
 */

export default ({ route, store }, next) => {

  // columns
  const isTwoColumns = ['about', 'project', 'sitemap'].includes(route.name)
  const isThreeColumns = ['music', 'app', 'service'].includes(route.name)
  
  // set columns
  if (store.state.global.isTwoColumns !== isTwoColumns) {
    store.commit('global/updateTwoColumnsState', isTwoColumns)
  }
  
  if (store.state.global.isThreeColumns !== isThreeColumns) {
    store.commit('global/updateThreeColumnsState', isThreeColumns)
  }

  next()
}
