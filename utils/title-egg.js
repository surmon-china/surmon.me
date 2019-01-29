/**
 * @file Title 彩蛋 / ES module
 * @module utils/title-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'
import { titles } from '~/config/egg.config'

let rollTimer = null
let eggTitle = ''
let reallyTitle = isBrowser ? document.title : ''

const now = new Date()
const today = now.getDate()
const tomonth = now.getMonth() + 1
const toyear = now.getFullYear()
const defaultEgg = `你好啊，怪物史莱克，今天是 ${tomonth} 🈷️ ${today} 日，又是有趣的一天~ `

const matchedEgg = titles.find(egg => {
  const isToday = egg.day === today
  const isTomonth = egg.month == null || egg.month === tomonth
  const isToyear = egg.year == null || egg.year === toyear
  return isToday && isTomonth && isToyear
})

eggTitle = matchedEgg ? matchedEgg.title : defaultEgg

// 滚动器
const setTitle = title => {
  document.title = title
  if (title.length <= 10) {
    return false
  }
  const [first, ...content] = title.split('')
  const newTitle = [...content, first].join('')
  rollTimer = setTimeout(() => setTitle(newTitle), 366);
}

// 彩蛋
export const setEggTitle = () => {
  reallyTitle = document.title
  setTitle(eggTitle)
}

// 恢复默认
export const resetTitle = () => {
  clearTimeout(rollTimer)
  document.title = reallyTitle
}
