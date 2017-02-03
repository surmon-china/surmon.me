import  {
	SET_PAGE_COL
} from '../types'

const state = {

  // 页面的栏目展示类型（3栏/2栏）
  pageCols: 3
}

const mutations = {
  [SET_PAGE_COL](state, col) {
    state.pageCols = col
  }
}

// 数据的过滤及处理
const getters = {

    // state是数据存储对象，getters可用于获取当前getters下的其他方法
  testGetters (state, getters) {

    // return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    return []
  }
}

export default {
  state,
  mutations,
  getters
}
