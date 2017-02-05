import Service from '~plugins/axios'

export const actions = {

  // 全局服务初始化
  async nuxtServerInit({ dispatch }) {
    await dispatch('loadAsideData')
  },

  // 加载边栏数据
  loadAsideData({ dispatch }) {
    return Promise.all([
      dispatch('loadTagList'),
      dispatch('loadHotArticles')
    ])
  },

  // 获取标签列表
  loadTagList({ commit }, params = {}) {
    commit('tag/REQUEST_LIST')
    return Service.get('/tag', { params })
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
  loadHotArticles({ commit }) {
    commit('article/REQUEST_HOT_LIST')
    const params = { short_name: 'surmon', num_items: 10, range: 'all' }
    return Service.get('http://api.duoshuo.com/sites/listTopThreads.json', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
      if(!success) commit('article/GET_HOT_LIST_FAILURE')
    }, err => {
      commit('article/GET_HOT_LIST_FAILURE', err)
    })
  },

  // 获取公告列表
  loadAnnouncements({ commit }, params = {}) {
    commit('announcement/REQUEST_LIST')
    return Service.get('/announcement', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('announcement/GET_LIST_SUCCESS', response.data)
      if(!success) commit('announcement/GET_LIST_FAILURE')
    }, err => {
      commit('announcement/GET_LIST_FAILURE', err)
    })
  },

  // 获取文章列表
  loadArticles({ commit }, params = { page: 1 }) {
    commit('article/REQUEST_LIST')
    return Service.get('/article', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      const commitName = (params.page && params.page > 1) ? 'article/ADD_LIST_SUCCESS' : 'article/GET_LIST_SUCCESS'
      if(success) commit(commitName, response.data)
      if(!success) commit('article/GET_LIST_FAILURE')
    })
    .catch(err => {
      commit('article/GET_LIST_FAILURE', err)
    })
  },

  // 获取文章详情
  loadArticleDetail({ commit }, params = {}) {
    commit('article/REQUEST_DETAIL')
    return Service.get(`/article/${ params.article_id }`)
    .then(response => {
      const success = Object.is(response.statusText, 'OK')
      if(success) commit('article/GET_DETAIL_SUCCESS', response.data)
      if(!success) commit('article/GET_DETAIL_FAILURE')
    }, err => {
      commit('article/GET_DETAIL_FAILURE', err)
    })
  },

  // 根据唯一key获取多说评论http://api.duoshuo.com/threads/listPosts.json?short_name=localhost-3000&thread_key=guestbook&page=1&limit=50
  

}