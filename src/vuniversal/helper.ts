
import { CreateAppFunction, createApp, createSSRApp } from 'vue'
import { createWebHistory, createMemoryHistory, RouterHistory } from 'vue-router'
import { isClient } from './env'

export * from './env'
export * from './creater'
export * from './helmet'

// Get function's arguments type
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never

// Only run in client env
export function clientOnly(callback: () => any): void {
  if (isClient) {
    return callback()
  }
}

// Auto create app with env
export const createUniversalApp: CreateAppFunction<Element> = (...args) => {
  // console.log('------createUniversalApp', 'isClient:', isClient)
  return isClient
    ? createApp(...args)
    : createSSRApp(...args)
}

// Auto create history with env
// Use hashHistory: isClient ? createWebHashHistory() : createMemoryHistory()
export function createUniversalHistory(...args: ArgumentTypes<typeof createWebHistory>): RouterHistory
export function createUniversalHistory(...args: ArgumentTypes<typeof createMemoryHistory>): RouterHistory
export function createUniversalHistory(...args: any): RouterHistory {
  // console.log('------createUniversalHistory', 'isClient:', isClient)
  return isClient
    ? createWebHistory(...args)
    : createMemoryHistory(...args)
}
