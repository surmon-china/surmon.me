import Service from '~plugins/axios'

export const actions = {

  // 全局服务初始化
  
  async nuxtServerInit({ dispatch }) {
    await dispatch('loadAppInitNeed')
  },

  loadAppInitNeed({ dispatch }) {
    return Promise.all([
      dispatch('loadTagList'),
      dispatch('loadAppOptions'),
      dispatch('loadHotArticles')
    ]);
  },

  // 获取全局配置
  loadAppOptions({ commit }) {
    commit('option/REQUEST_OPTIONS')
    Service.get('/option')
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('option/REQUEST_SUCCESS', response.data)
      if(!success) commit('option/REQUEST_FAILURE')
    })
    .catch(err => {
      commit('option/REQUEST_FAILURE', err)
    })
  },

  // 获取标签列表
  loadTagList({ commit }, params = {}) {
    commit('tag/REQUEST_LIST')
    Service.get('/tag', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('tag/GET_LIST_SUCCESS', response.data)
      if(!success) commit('tag/GET_LIST_FAILURE')
    })
    .catch(err => {
      commit('tag/GET_LIST_FAILURE', err)
    })
  },

  // 获取最热文章列表
  loadHotArticles({ commit }, params = {}) {
    commit('article/REQUEST_HOT_LIST')
    Service.get('/article', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
      if(!success) commit('article/GET_HOT_LIST_FAILURE')
    }, err => {
      commit('article/GET_HOT_LIST_FAILURE', err)
    })
  },

  // 获取最新文章列表
  loadMoreArticles({ commit, dispatch, state }, params = {}) {
    commit('article/REQUEST_LIST')
    Service.get('/article', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('article/ADD_LIST_SUCCESS', response.data)
      if(!success) commit('article/GET_LIST_FAILURE')
    })
    .catch(err => {
      commit('article/GET_LIST_FAILURE', err)
    })
  },

  // 获取文章详情
  loadArticleDetail({ commit, dispatch, state }, params = {}) {
    commit('article/REQUEST_DETAIL')
    Service.get(`/article/${ params.article._id }`)
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('article/GET_DETAIL_SUCCESS', response.data)
      if(!success) commit('article/GET_DETAIL_FAILURE')
    }, err => {
      commit('article/GET_DETAIL_FAILURE', err)
    })
  }

}