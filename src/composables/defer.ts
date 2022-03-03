/**
 * @file Client defer task manager
 * @module composable.defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, reactive, Plugin } from 'vue'

declare global {
  interface Window {
    // @ts-ignore
    $defer: Defer
  }
}

// @ts-ignore
export type Defer = ReturnType<typeof createDeferStore>
export type DeferTask = () => any
const createDeferStore = () => {
  const state = reactive({
    loaded: false,
    tasks: [] as Array<DeferTask>
  })

  const doTask = (task: DeferTask) => {
    window.setTimeout(task, 666)
  }

  const handleLoaded = () => {
    state.loaded = true
    state.tasks.forEach((task) => doTask(task))
  }

  const addTask = (task: DeferTask) => {
    state.tasks.push(task)
    if (state.loaded) {
      doTask(task)
    }
  }

  window.addEventListener('load', handleLoaded)
  return { state, addTask }
}

const DeferSymbol = Symbol('defer')

export interface DeferPluginConfig {
  exportToGlobal?: boolean
}
export const createDefer = (): Defer & Plugin => {
  const defer = createDeferStore()
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

export const useDefer = (): Defer => {
  return inject(DeferSymbol) as Defer
}
