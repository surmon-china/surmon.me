/**
 * @file Client defer task manager
 * @module composable/defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin, inject, ref } from 'vue'

export type DeferTask = () => any

const createDeferState = () => {
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

export type Defer = ReturnType<typeof createDeferState>

const DeferSymbol = Symbol('defer-state')

export interface DeferPluginConfig {
  exportToGlobal?: boolean
}

export const createDefer = (): Defer & Plugin<DeferPluginConfig> => {
  const defer = createDeferState()
  return Object.assign(defer, {
    install(app: App, config?: DeferPluginConfig) {
      app.provide(DeferSymbol, defer)
      app.config.globalProperties.$defer = defer
      if (config?.exportToGlobal) {
        window.$defer = defer
      }
    }
  })
}

export const useDefer = (): Defer => {
  return inject(DeferSymbol) as Defer
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $defer: Defer
  }
}

declare global {
  interface Window {
    $defer?: Defer
  }
}
