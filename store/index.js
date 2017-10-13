/*
*
* 根数据状态 存放全局数据和异步方法
*
*/

import Service from '~/plugins/axios'
import EventBus from '~/utils/event-bus'
import UaParse from '~/utils/ua-parse'

// global actions
export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, { params, route, isServer, req }) {
    // 检查设备类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = UaParse(userAgent)
    const mustJpg = (isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge)
    store.commit('option/SET_IMG_EXT', mustJpg ? 'jpeg' : 'webp')
    // console.log(mustJpg ? 'jpeg' : 'webp')
    store.commit('option/SET_MOBILE_LAYOUT', isMobile)
    store.commit('option/SET_USER_AGENT', userAgent)
    const initAppData = [
      // 配置数据
      store.dispatch('loadAdminInfo'),
      store.dispatch('loadGlobalOption'),
      // 内容数据
      store.dispatch('loadTagList'),
      store.dispatch('loadCategories')
    ]
    // 如果不是移动端的话，则请求热门文章
    if (!isMobile) {
      initAppData.push(store.dispatch('loadHotArticles'))
    }
    // 首次服务端渲染时渲染评论数据
    const isGuestbook = Object.is(route.name, 'guestbook')
    const post_id = params.article_id || (isGuestbook ? 0 : false)
    if (!Object.is(post_id, false)) {
      initAppData.push(store.dispatch('loadCommentsByPostId', { post_id }))
    }
    return Promise.all(initAppData)
  },

  // 获取博主资料
  loadAdminInfo({ commit }) {
    commit('option/REQUEST_ADMIN_INFO')
    return Service.get('/auth')
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('option/REQUEST_ADMIN_INFO_SUCCESS', response.data)
      if(!success) commit('option/REQUEST_ADMIN_INFO_FAILURE')
    }, err => {
      commit('option/REQUEST_ADMIN_INFO_FAILURE', err)
    })
  },

  // 获取全局配置
  loadGlobalOption({ commit }) {
    commit('option/REQUEST_GLOBAL_OPTIONS')
    return Service.get('/option')
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('option/REQUEST_GLOBAL_OPTIONS_SUCCESS', response.data)
      if(!success) commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE')
    }, err => {
      commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
    })
  },

  // 获取标签列表
  loadTagList({ commit }, params = { per_page: 160 }) {
    commit('tag/REQUEST_LIST')
    return Service.get('/tag', { params })
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('tag/GET_LIST_SUCCESS', response.data)
      if(!success) commit('tag/GET_LIST_FAILURE')
    })
    .catch(err => {
      commit('tag/GET_LIST_FAILURE', err)
    })
  },

  // 获取分类列表
  loadCategories({ commit }, params = { per_page: 100 }) {
    commit('category/REQUEST_LIST')
    return Service.get('/category', { params })
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('category/GET_LIST_SUCCESS', response.data)
      if(!success) commit('category/GET_LIST_FAILURE')
    })
    .catch(err => {
      commit('category/GET_LIST_FAILURE', err)
    })
  },

  // 获取最热文章列表
  loadHotArticles({ commit }) {
    commit('article/REQUEST_HOT_LIST')
    return Service.get('/article', { params: { hot: 1 }})
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
      if(!success) commit('article/GET_HOT_LIST_FAILURE')
    }, err => {
      commit('article/GET_HOT_LIST_FAILURE', err)
    })
  },

  // 根据post-id获取评论列表
  loadCommentsByPostId({ commit }, params) {
    params.sort = params.sort || -1
    params.page = params.page || 1
    params.per_page = params.per_page || 88
    if (Object.is(params.page, 1)) {
      commit('comment/CLEAR_LIST')
    }
    commit('comment/REQUEST_LIST')
    return Service.get('/comment', { params })
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) {
        if (Object.is(params.sort, -1)) response.data.result.data.reverse()
        commit('comment/GET_LIST_SUCCESS', response.data)
      }
      if(!success) commit('comment/GET_LIST_FAILURE')
    }, err => {
      commit('comment/GET_LIST_FAILURE', err)
    })
  },

  // 发布评论
  postComment({ commit }, comment) {
    commit('comment/POST_ITEM')
    return Service.post('/comment', comment)
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) {
        commit('comment/POST_ITEM_SUCCESS', response.data)
        return Promise.resolve(response.data)
      } else {
        commit('comment/POST_ITEM_FAILURE')
        return Promise.reject(response.data)
      }
    }, err => {
      commit('comment/POST_ITEM_FAILURE', err)
      return Promise.reject(err)
    })
  },

  // 喜欢某个页面或主站 || 为某条回复点赞
  likeArticleOrPageOrComment({ commit }, like) {
    return Service.post('/like', like)
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) {
        let mutation
        switch(like.type) {
          case 1:
            mutation = 'comment/LIKE_ITEM'
            break
          case 2:
            mutation = Object.is(like.id, 0) ? 'option/LIKE_SITE' : 'article/LIKE_ARTICLE'
            break
          default:
            break
        }
        commit(mutation, like)
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response.data)
      }
    }, err => {
      return Promise.reject(err)
    })
  },

  // 获取公告列表
  loadAnnouncements({ commit }, params = {}) {
    commit('announcement/REQUEST_LIST')
    return Service.get('/announcement', { params })
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
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
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      const commitName =  `sitemap/GET_ARTICLES_SUCCESS`
      if(success) commit(commitName, response.data)
      if(!success) commit('sitemap/GET_ARTICLES_FAILURE')
    })
    .catch(err => {
      commit('sitemap/GET_ARTICLES_FAILURE', err)
    })
  },

  // 获取文章列表
  loadArticles({ commit }, params = { page: 1 }) {
    commit('article/REQUEST_LIST')
    return Service.get('/article', { params })
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
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
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('article/GET_DETAIL_SUCCESS', response.data)
      if(!success) commit('article/GET_DETAIL_FAILURE')
      return Promise.resolve(response.data)
    }, err => {
      commit('article/GET_DETAIL_FAILURE', err)
      return Promise.reject(err)
    })
  },

  // 获取开源项目列表
  loadGithubRepositories({ commit, state }) {
    // 如果数据已存在，则直接返回Promise成功，并返回数据
    if (state.project.repositories.data.length) {
      return Promise.resolve(state.project.repositories.data)
    }
    // 不存在则请求新数据
    commit('project/REQUEST_GUTHUB_REPOSITORIES')
    return Service.get(`/github`)
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) commit('project/REQUEST_GUTHUB_REPOSITORIES_SUCCESS', response.data)
      if(!success) commit('project/REQUEST_GUTHUB_REPOSITORIES_FAILURE')
    }, err => {
      commit('project/REQUEST_GUTHUB_REPOSITORIES_FAILURE', err)
    })
  },

  // 获取歌曲列表
  loadMuiscPlayerList({ commit }) {
    EventBus.REQUEST_LIST()
    return Service.get('/music/list/638949385')
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) {
        EventBus.GET_LIST_SUCCESS(response.data)
        EventBus.INIT_PLAYER()
      }
      if(!success) EventBus.GET_LIST_FAILURE()
    }, err => {
      EventBus.GET_LIST_FAILURE(err)
    })
  },

  // 获取歌曲详情
  loadMuiscSongDetail({ commit }, params = {}) {
    EventBus.REQUEST_SONG()
    return Service.get(`/music/song/${ params.song_id }`)
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) EventBus.GET_SONG_SUCCESS(response.data)
      if(!success) EventBus.GET_SONG_FAILURE()
    }, err => {
      EventBus.GET_SONG_FAILURE(err)
    })
  },

  // 获取歌曲歌词
  loadMuiscSongLrc({ commit }, params = {}) {
    EventBus.REQUEST_LRC()
    return Service.get(`/music/lrc/${ params.song_id }`)
    .then(response => {
      const success = !!response.status && response.data && Object.is(response.data.code, 1)
      if(success) EventBus.GET_LRC_SUCCESS(response.data)
      if(!success) EventBus.GET_LRC_FAILURE()
    }, err => {
      EventBus.GET_LRC_FAILURE(err)
    })
  }
}
