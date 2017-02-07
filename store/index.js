import Service from '~plugins/axios'

export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, { params, route }) {
    const initAppData = [
      store.dispatch('loadTagList'),
      store.dispatch('loadHotArticles')
    ]
    const isGb = Object.is(route.name, 'guestbook')
    const thread_key = params.article_id || (isGb ? 'guestbook' : false)
    if (thread_key) {
      initAppData.push(store.dispatch('loadCommentsByThirdKey', { thread_key }))
    }
    return Promise.all(initAppData)
  },

  // 获取标签列表
  loadTagList({ commit }, params = {}) {
    commit('tag/REQUEST_LIST')
    return Service.get('/tag', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 1)
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
    const params = { short_name: process.env.duoshuoShortName, num_items: 10, range: 'all' }
    return Service.get('http://api.duoshuo.com/sites/listTopThreads.json', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 0)
      if(success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
      if(!success) commit('article/GET_HOT_LIST_FAILURE')
    }, err => {
      commit('article/GET_HOT_LIST_FAILURE', err)
    })
  },

  // 根据唯一key获取多说评论  http://api.duoshuo.com/threads/listPosts.json?short_name=localhost-3000&thread_key=guestbook&page=1&limit=50
  loadCommentsByThirdKey({ commit }, { thread_key }) {
    commit('comment/REQUEST_LIST')
    const params = { short_name: process.env.duoshuoShortName, limit: 50, page: 1, thread_key }
    return Service.get('http://api.duoshuo.com/threads/listPosts.json', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 0)
      if(success) commit('comment/GET_LIST_SUCCESS', response.data)
      if(!success) commit('comment/GET_LIST_FAILURE')
    }, err => {
      commit('comment/GET_LIST_FAILURE', err)
    })
  },

  // 获取公告列表
  loadAnnouncements({ commit }, params = {}) {
    commit('announcement/REQUEST_LIST')
    return Service.get('/announcement', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 1)
      if(success) commit('announcement/GET_LIST_SUCCESS', response.data)
      if(!success) commit('announcement/GET_LIST_FAILURE')
    }, err => {
      commit('announcement/GET_LIST_FAILURE', err)
    })
  },

  // 获取地图文章列表
  loadSitemapArticles({ commit }, params = { page: 1 }) {
    commit('sitemap/REQUEST_ARTICLES')
    return Service.get('/article', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 1)
      const commitName =  `sitemap/GET_ARTICLES_SUCCESS`
      if(success) commit(commitName, response.data)
      if(!success) commit('sitemap/GET_ARTICLES_FAILURE')
    })
    .catch(err => {
      commit('sitemap/GET_ARTICLES_FAILURE', err)
    })
  },

  // 获取地图分类列表
  loadSitemapCategories({ commit }, params = { page: 1 }) {
    commit('sitemap/REQUEST_CATEGORY')
    return Service.get('/category', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 1)
      const commitName =  `sitemap/GET_CATEGORY_SUCCESS`
      if(success) commit(commitName, response.data)
      if(!success) commit('sitemap/GET_CATEGORY_FAILURE')
    })
    .catch(err => {
      commit('sitemap/GET_CATEGORY_FAILURE', err)
    })
  },

  // 获取文章列表
  loadArticles({ commit }, params = { page: 1 }) {
    commit('article/REQUEST_LIST')
    return Service.get('/article', { params })
    .then(response => {
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 1)
      const isFirstPage = params.page && params.page > 1
      const commitName =  `article/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
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
      const success = Object.is(response.statusText, 'OK') && Object.is(response.data.code, 1)
      if(success) commit('article/GET_DETAIL_SUCCESS', response.data)
      if(!success) commit('article/GET_DETAIL_FAILURE')
    }, err => {
      commit('article/GET_DETAIL_FAILURE', err)
    })
  }
}
