/**
 * @file 客户端初始化任务管理器 / ES module
 * @module plugins/loaded-task
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'
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
    window.loadedTasks.forEach(task => doTask(task))
  }

  // 任务管理
  const addLoadedTask = task => {
    if (window.loaded) {
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
