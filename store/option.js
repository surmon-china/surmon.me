/*
*
* 全局设置数据状态
*
*/

export const state = {

  // 页面的栏目展示类型（3栏/2栏）
  fullColumn: false,

  // 服务端的配置
  serverOptions: {
    fetching: false,
    data: {
      result: {}
    }
  }
}

export const mutations = {

	// 设置栏目结构
  SET_FULL_COLUMU(state, action) {
    state.fullColumn = action
  },

  // 获取服务端配置
  REQUEST_OPTIONS(state) {
    state.serverOptions.fetching = true
  },
  REQUEST_FAILURE(state) {
    state.serverOptions.fetching = false
    state.serverOptions.data = { result: {}}
  },
  REQUEST_SUCCESS(state, action) {
    state.serverOptions.fetching = false
    state.serverOptions.data = action
  }
}
