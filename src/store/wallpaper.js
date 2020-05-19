/**
 * @file wallpaper / ES module
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

export const WALLPAPER_API_PATH = '/wallpaper/list'

export const state = () => {
  return {
    fetching: false,
    zh: null,
    en: null
  }
}

export const getters = {
  parpers(state, _, __, rootGetters) {
    return rootGetters['global/isEnLang']
      ? state.en
      : state.zh
  }
}

export const mutations = {
  updatePapersFetching(state, action) {
    state.fetching = action
  },
  updateZhPapersData(state, action) {
    state.zh = action.result
  },
  updateEnPapersData(state, action) {
    state.en = action.result
  }
}

export const actions = {
  // 获取今日壁纸
  fetchPapers({ commit, state }, isEn) {

    // 如果数据已存在，则直接返回数据
    if (isEn && state.en) {
      return Promise.resolve(state.en)
    }
    if (!isEn && state.zh) {
      return Promise.resolve(state.zh)
    }

    // 不存在则请求新数据
    commit('updatePapersFetching', true)
    return this.$axios
      .$get(WALLPAPER_API_PATH, { params: { en: isEn ? 1 : 0 }})
      .then(response => {
        isEn
          ? commit('updateEnPapersData', response)
          : commit('updateZhPapersData', response)
      })
      .finally(() => {
        commit('updatePapersFetching', false)
      })
  }
}
