import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  // 所有状态
  state: {

    // 页面的栏目展示类型（3栏/2栏）
    pageCols: 3
  },

  // 网络请求类的一步操作
  actions: {

    // 请求文章列表
    FETCH_ARTICLE_LIST: ({ commit, dispatch, state }, { type }) => {

      // 可以直接commmit调用mutation方法（commit必须是同步操作）
      commit('SET_ACTIVE_TYPE', { type })

      // 返回一个异步回调（用dispatch来调用异步事件）
      /*
      return fetchIdsByType(type)
        .then(ids => commit('SET_LIST', { type, ids }))
        .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
      */
    }
  },

  // 改变状态的方法（必须是同步方法）
  mutations: {

    // 设置页面栏目
    SET_PAGE_COL: (state, col) => {
      state.pageCols = col
    }
  },

  // 数据的过滤及处理
  getters: {

    // state是数据存储对象，getters可用于获取当前getters下的其他方法
    testGetters (state, getters) {
      // return getters.activeIds.map(id => state.items[id]).filter(_ => _)
      return []
    }
  }
})

export default store
