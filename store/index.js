/**
 * @file 根数据状态,存放全局数据和异步方法 / ES module
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import apiConfig from '~/api.config'
import { isBrowser, isServer } from '~/environment'
import uaDevice from '~/utils/ua-device'
import eventBus from '~/utils/event-bus'
import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

const API_PREFIX = apiConfig.baseUrl

// 兼容 Axios 在不同协议的不同表现
const getResData = response => response.status ? response.data : response
const resIsSuccess = response => {
  // HTTP2
  if (response.status) {
    return response.status && response.data && Object.is(response.data.code, 1)
  } else {
    return Object.is(response.code, 1)
  }
}

// global actions
export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, { req, params, route }) {

    // 检查设备类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = uaDevice(userAgent)
    const mustJpg = (isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge)

    store.commit('option/SET_USER_AGENT', userAgent)
    store.commit('option/SET_MOBILE_LAYOUT', isMobile)
    store.commit('option/SET_IMG_EXT', mustJpg ? 'jpeg' : 'webp')

    // 如果是移动端，则设置语言为中文
    if (isMobile) {
      store.commit('option/SWITCH_LANGUAGE', 'zh')
    }

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
    if (post_id !== false) {
      initAppData.push(store.dispatch('loadCommentsByPostId', { post_id }))
    }

    return Promise.all(initAppData)
  },

  // 获取博主资料
  loadAdminInfo({ commit }) {
    commit('option/REQUEST_ADMIN_INFO')
    return this.$axios.$get(`${API_PREFIX}/auth`)
      .then(response => {
        resIsSuccess(response)
          ? commit('option/REQUEST_ADMIN_INFO_SUCCESS', getResData(response))
          : commit('option/REQUEST_ADMIN_INFO_FAILURE')
      })
      .catch(err => {
        commit('option/REQUEST_ADMIN_INFO_FAILURE', err)
      })
  },

  // 获取全局配置
  loadGlobalOption({ commit }) {
    commit('option/REQUEST_GLOBAL_OPTIONS')
    return this.$axios.$get(`${API_PREFIX}/option`)
      .then(response => {
        resIsSuccess(response)
          ? commit('option/REQUEST_GLOBAL_OPTIONS_SUCCESS', getResData(response))
          : commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE')
      })
      .catch(err => {
        commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
      })
  },

  // 获取标签列表
  loadTagList({ commit }, params = { per_page: 160 }) {
    commit('tag/REQUEST_LIST')
    return this.$axios.$get(`${API_PREFIX}/tag`, { params })
      .then(response => {
        resIsSuccess(response)
          ? commit('tag/GET_LIST_SUCCESS', getResData(response))
          : commit('tag/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('tag/GET_LIST_FAILURE', err)
      })
  },

  // 获取分类列表
  loadCategories({ commit }, params = { per_page: 100 }) {
    commit('category/REQUEST_LIST')
    return this.$axios.$get(`${API_PREFIX}/category`, { params })
      .then(response => {
        resIsSuccess(response)
          ? commit('category/GET_LIST_SUCCESS', getResData(response))
          : commit('category/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('category/GET_LIST_FAILURE', err)
      })
  },

  // 获取最热文章列表
  loadHotArticles({ commit }) {
    commit('article/REQUEST_HOT_LIST')
    return this.$axios.$get(`${API_PREFIX}/article`, { params: { hot: 1 }})
      .then(response => {
        resIsSuccess(response)
          ? commit('article/GET_HOT_LIST_SUCCESS', getResData(response))
          : commit('article/GET_HOT_LIST_FAILURE')
      })
      .catch(err => {
        commit('article/GET_HOT_LIST_FAILURE', err)
      })
  },

  // 根据post-id获取评论列表
  loadCommentsByPostId({ commit }, params) {

    params = Object.assign({
      page: 1,
      sort: -1,
      per_page: 88
    }, params)
    
    if (params.page === 1) {
      commit('comment/CLEAR_LIST')
    }

    commit('comment/REQUEST_LIST')
    return this.$axios.$get(`${API_PREFIX}/comment`, { params })
      .then(response => {
        if (resIsSuccess(response)) {
          const data = getResData(response)
          Object.is(params.sort, -1) && data.result.data.reverse()
          commit('comment/GET_LIST_SUCCESS', data)
        } else {
          commit('comment/GET_LIST_FAILURE')
        }
      })
      .catch(err => {
        commit('comment/GET_LIST_FAILURE', err)
      })
  },

  // 发布评论
  postComment({ commit }, comment) {
    commit('comment/POST_ITEM')
    return this.$axios.$post(`${API_PREFIX}/comment`, comment)
      .then(response => {
        const data = getResData(response)
        if (resIsSuccess(response)) {
          commit('comment/POST_ITEM_SUCCESS', data)
          return Promise.resolve(data)
        } else {
          commit('comment/POST_ITEM_FAILURE')
          return Promise.reject(data)
        }
      })
      .catch(err => {
        commit('comment/POST_ITEM_FAILURE', err)
        return Promise.reject(err)
      })
  },

  // 喜欢某个页面或主站 || 为某条回复点赞
  likeArticleOrPageOrComment({ commit }, like) {
    return this.$axios.$post(`${API_PREFIX}/like`, like)
      .then(response => {
        const data = getResData(response)
        if (resIsSuccess(response)) {
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
          return Promise.resolve(data)
        } else {
          return Promise.reject(data)
        }
      })
  },

  // 获取公告列表
  loadAnnouncements({ commit }, params = {}) {
    commit('announcement/REQUEST_LIST')
    return this.$axios.$get(`${API_PREFIX}/announcement`, { params })
      .then(response => {
        resIsSuccess(response)
          ? commit('announcement/GET_LIST_SUCCESS', getResData(response))
          : commit('announcement/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('announcement/GET_LIST_FAILURE', err)
      })
  },

  // 获取地图文章列表
  loadSitemapArticles({ commit }, params = { page: 1 }) {
    commit('sitemap/REQUEST_ARTICLES')
    return this.$axios.$get(`${API_PREFIX}/article`, { params })
      .then(response => {
        resIsSuccess(response)
          ? commit(`sitemap/GET_ARTICLES_SUCCESS`, getResData(response))
          : commit('sitemap/GET_ARTICLES_FAILURE')
      })
      .catch(err => {
        commit('sitemap/GET_ARTICLES_FAILURE', err)
      })
  },

  // 获取文章列表
  loadArticles({ commit }, params = { page: 1 }) {
    if (Object.is(params.page, 1)) {
      commit('article/CLEAR_LIST')
    }
    commit('article/REQUEST_LIST')
    return this.$axios.$get(`${API_PREFIX}/article`, { params })
      .then(response => {
        const success = resIsSuccess(response)
        const loadMore = params.page && params.page > 1
        const commitName =  `article/${loadMore ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) {
          commit(commitName, getResData(response))
          if (loadMore && isBrowser) {
            Vue.nextTick(() => {
              scrollTo(window.scrollY + (window.innerHeight * 0.8), 300, { easing: Easing['ease-in'] })
            })
          }
        } else {
          commit('article/GET_LIST_FAILURE')
        }
      })
      .catch(err => {
        commit('article/GET_LIST_FAILURE', err)
      })
  },

  // 获取文章详情
  loadArticleDetail({ commit }, params = {}) {
    commit('article/REQUEST_DETAIL')
    return this.$axios.$get(`${API_PREFIX}/article/${params.article_id}`)
    .then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('article/GET_DETAIL_SUCCESS', data)
        return Promise.resolve(data)
      } else {
        commit('article/GET_DETAIL_FAILURE')
        return Promise.reject(response)
      }
    })
    .catch(err => {
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
    return this.$axios.$get(`${API_PREFIX}/github`)
      .then(response => {
        resIsSuccess(response)
          ? commit('project/REQUEST_GUTHUB_REPOSITORIES_SUCCESS', getResData(response))
          : commit('project/REQUEST_GUTHUB_REPOSITORIES_FAILURE')
      })
      .catch(err => {
        commit('project/REQUEST_GUTHUB_REPOSITORIES_FAILURE', err)
      })
  },

  // 获取歌曲列表
  loadMuiscPlayerList({ commit }) {
    eventBus.requestMusicList()
    return this.$axios.$get(`${API_PREFIX}/music/list/638949385`)
    .then(response => {
      if (resIsSuccess(response)) {
        eventBus.getMusicListSuccess(getResData(response))
        eventBus.initPlayer()
      } else {
        eventBus.getMusicListFailure()
      }
    })
    .catch(eventBus.getMusicListFailure)
  },

  // 获取歌曲详情
  loadMuiscSongDetail({ commit }, params = {}) {
    eventBus.requestSong()
    return this.$axios.$get(`${API_PREFIX}/music/song/${params.song_id}`)
    .then(response => {
      resIsSuccess(response)
        ? eventBus.getSongSuccess(getResData(response))
        : eventBus.getSongFailure()
    })
    .catch(eventBus.getSongFailure)
  },

  // 获取歌曲歌词
  loadMuiscSongLrc({ commit }, params = {}) {
    eventBus.requestLrc()
    return this.$axios.$get(`${API_PREFIX}/music/lrc/${params.song_id}`)
    .then(response => {
      resIsSuccess(response)
        ? eventBus.getLrcSuccess(getResData(response))
        : eventBus.getLrcFailure()
    })
    .catch(eventBus.getLrcFailure)
  }
}
