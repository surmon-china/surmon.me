/**
 * @file 根数据状态，仅用以调度初始化任务 / ES module
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { createStore, useStore as useVuexStore } from 'vuex'
import { Request } from 'express'
import optionModule, { OptionModuleName, OptionModuleActions } from './option'

export type IRootStore = ReturnType<typeof createUniversalStore>
export const createUniversalStore = () => createStore({
  modules: {
    [OptionModuleName]: optionModule
  }
})

export function useStore(): IRootStore {
  return useVuexStore()
}

// TODO: 也许 asyncData | component async steup 已经支持细化组件了
export const initStore = (appContext: any, { target, request: Request }) => {
  const { store, globalState } = appContext

  // 初始化时的全局任务
  const initFetchAppData = [
    // 内容数据
    store.dispatch('tag/fetchList'),
    store.dispatch('category/fetchList'),
    store.dispatch(OptionModuleActions.FetchAdminInfo)
  ]

  // 如果不是移动端的话，则请求热门文章
  if (!globalState.isMobile) {
    initFetchAppData.push(store.dispatch('article/fetchHotList'))
  }

  return Promise.all(initFetchAppData)
}
