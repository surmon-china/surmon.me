export default function ({ route, store }, next) {

	// fullColumn
  const fullColumnPageNames = ['about', 'project', 'sitemap']
  const fullColumn = fullColumnPageNames.includes(route.name)
  
  // set fullColumn
  if (!Object.is(store.state.option.fullColumn, fullColumn)) {
    store.commit('option/SET_FULL_COLUMU', fullColumn)
  }

	// errorColumn
  const errorColumn = ['music', 'app', 'service'].includes(route.name)

  // set errorColumn
  if (!Object.is(store.state.option.errorColumn, errorColumn)) {
  	store.commit('option/SET_ERROR_COLUMU', errorColumn)
  }

  // next
  next()
}
