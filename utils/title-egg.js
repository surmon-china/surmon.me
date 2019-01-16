/**
 * @file Title 彩蛋 / ES module
 * @module utils/title-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment'

let rollTimer = null
let eggTitle = ''
let reallyTitle = isBrowser ? document.title : ''

const now = new Date()
const today = now.getDate()
const tomonth = now.getMonth() + 1
const toyear = now.getFullYear()
const defaultEgg = `今天是 ${tomonth} 月 ${today} 日，祝你快乐~ `

// 彩蛋表
const eggs = [
  {
    day: 1,
    month: 1,
    title: '🎁 元旦快乐！'
  },
  {
    day: 28,
    month: 1,
    year: 2019,
    title: `🎁 今日小年，新年快乐！`
  },
  {
    day: 4,
    month: 2,
    year: 2019,
    title: '🎁 除夕快乐！'
  },
  {
    day: 5,
    month: 2,
    year: 2019,
    title: '🎁 新年快乐！'
  },
  {
    day: 14,
    month: 2,
    title: '🎁 有情人终成眷属！'
  },
  {
    day: 19,
    month: 2,
    year: 2019,
    title: '🎁 元宵节快乐！'
  },
  {
    day: 8,
    month: 3,
    title: '🎁 女神节快乐！'
  },
]

const matchedEgg = eggs.find(egg => {
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
