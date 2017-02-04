/*
* 全局设置数据状态
*/

export const state = {

  // 页面的栏目展示类型（3栏/2栏）
  pageCols: 3,
  severOptions: {
    fetching: false,
    data: {
      result: {}
    }
  }
}

export const mutations = {

	// 设置栏目结构
  SET_PAGE_COL(state, col) {
    state.pageCols = col
  },

  // 获取服务端配置
  REQUEST_OPTIONS(state) {
    state.severOptions.fetching = true
  },
  REQUEST_FAILURE(state) {
    state.severOptions.fetching = false
    state.severOptions.data = { result: {}}
  },
  REQUEST_SUCCESS(state, action) {
    state.severOptions.fetching = false
    state.severOptions.data = action
  }
}
