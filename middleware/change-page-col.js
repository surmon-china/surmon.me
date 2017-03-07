export default function ({ route, store }, next) {
  const fullColumnPageNames = ['about', 'music', 'project', 'sitemap']
  const fullColumn = fullColumnPageNames.includes(route.name)
  if (!Object.is(store.state.option.fullColumn, fullColumn)) {
    store.commit('option/SET_FULL_COLUMU', fullColumn)
  }
	next()
}
