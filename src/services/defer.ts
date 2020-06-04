/**
 * @file 客户端初始化任务管理器
 * @module service/defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, reactive } from 'vue'

export type ITask = () => any
export type IDefer = ReturnType<typeof createDefer>

declare global {
  interface Window {
    defer: IDefer
  }
}

const createDefer = () => {
  const state = reactive({
    loaded: false,
    tasks: [] as Array<ITask>
  })

  const doTask = (task: ITask) => {
    window.setTimeout(task, 666)
  }

  const handleLoaded = () => {
    state.loaded = true
    state.tasks.forEach(task => doTask(task))
  }

  const addTask = (task: ITask) => {
    if (state.loaded) {
      doTask(task)
    } else {
      state.tasks.push(task)
    }
  }

  window.addEventListener('load', handleLoaded)
  return { ...state, addTask }
}

const DeferSymbol = Symbol('defer')
export default (app: App) => {
  const defer = window.defer || createDefer()
  app.provide(DeferSymbol, defer)
  window.defer = defer
}

export const useDefer = (): IDefer => {
  return inject(DeferSymbol) as IDefer
}
