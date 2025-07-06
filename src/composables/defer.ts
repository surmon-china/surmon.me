/**
 * @file Client defer task manager
 * @module composable/defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, Plugin } from 'vue'

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
  const loaded = ref<boolean>(document.readyState === 'complete')
  const tasks: DeferTask[] = []

  const doTask = (task: DeferTask) => {
    Promise.resolve().then(task)
  }

  const handleLoaded = () => {
    loaded.value = true
    tasks.forEach((task) => doTask(task))
    tasks.length = 0
  }

  const addTask = (task: DeferTask) => {
    if (!loaded.value) {
      tasks.push(task)
    } else {
      doTask(task)
    }
  }

  if (document.readyState === 'complete') {
    handleLoaded()
  } else {
    window.addEventListener('load', handleLoaded)
  }

  return { loaded, tasks, addTask }
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
