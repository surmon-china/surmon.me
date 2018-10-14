/**
 * @file 客户端初始化任务管理器 / ES module
 * @module plugins/loaded-task
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser, isServer } from '~/environment'
import consoleSlogan from '~/utils/console-slogan'

if (isBrowser) {

  // 执行任务
  const doTask = task => {
    window.setTimeout(task, 666)
    consoleSlogan()
  }

  // 初始化
  const loadedHander = event => {
    window.loaded = true
    // console.log(`客户端 loaded，执行 ${window.loadedTasks.length} 个任务！`)
    window.loadedTasks.forEach(task => doTask(task))
  }

  // 任务管理
  const addLoadedTask = task => {
    if (window.loaded) {
      // console.log(`即时执行 1 个任务！`, task)
      doTask(task)
    } else {
      window.loadedTasks.push(task)
    }
  }

  window.loaded = false
  window.loadedTasks = []
  window.addLoadedTask = addLoadedTask
  window.addEventListener('load', loadedHander)
}
