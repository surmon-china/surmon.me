/**
 * @file Client defer task manager
 * @module service.defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, reactive, Plugin } from 'vue'

export type ITask = () => any
export type IDefer = ReturnType<typeof createDefer>

declare global {
  interface Window {
    $defer: IDefer
  }
}

const createDeferStore = () => {
  const state = reactive({
    loaded: false,
    tasks: [] as Array<ITask>
  })

  const doTask = (task: ITask) => {
    window.setTimeout(task, 666)
  }

  const handleLoaded = () => {
    state.loaded = true
    state.tasks.forEach((task) => doTask(task))
  }

  const addTask = (task: ITask) => {
    state.tasks.push(task)
    if (state.loaded) {
      doTask(task)
    }
  }

  window.addEventListener('load', handleLoaded)
  return { ...state, addTask }
}

const DeferSymbol = Symbol('defer')

export interface DeferPluginConfig {
  exportToGlobal?: boolean
}
export type Defer = ReturnType<typeof createDeferStore>
export const createDefer = (): Defer & Plugin => {
  const defer = window.$defer || createDeferStore()

  return {
    ...defer,
    install(app: App, config?: DeferPluginConfig) {
      app.provide(DeferSymbol, defer)

      if (config?.exportToGlobal) {
        window.$defer = defer
      }
    }
  }
}

export const useDefer = (): IDefer => {
  return inject(DeferSymbol) as IDefer
}
