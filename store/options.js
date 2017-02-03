export const state = {

  // 页面的栏目展示类型（3栏/2栏）
  pageCols: 3
}

export const mutations = {
  SET_PAGE_COL(state, col) {
    state.pageCols = col
  }
}
