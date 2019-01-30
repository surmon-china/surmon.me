/**
 * @file Title 彩蛋 / ES module
 * @module utils/title-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import Favico from '~/plugins/favico'
import { isBrowser } from '~/environment/esm'
import { titles } from '~/config/egg.config'

let favicon = null
let faviconTimer = null

let rollTimer = null
let eggTitle = ''
let reallyTitle = isBrowser ? document.title : ''

const now = new Date()
const today = now.getDate()
const tomonth = now.getMonth() + 1
const toyear = now.getFullYear()
const defaultEgg = `你好啊，怪物史莱克，今天是 ${tomonth} 月 ${today} 日，又是有趣的一天~ `

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
  rollTimer = setTimeout(() => setTitle(newTitle), 366)
}

const setFavicon = () => {
  favicon = new Favico({ type: 'rectangle', animation: 'popFade' })
  let index = 0
  const positions = ['upleft', 'up', 'down', 'left']
  const words = '新年快乐'.split('')
  const doSetFavicon = () => {
    const text = words[index % words.length]
    const position = positions[index % positions.length]
    favicon.badge(text, { position })
    index++
    faviconTimer = setTimeout(doSetFavicon, 366)
  }
  doSetFavicon()
}

// 彩蛋
export const startTitleEgg = () => {
  reallyTitle = document.title
  setTitle(eggTitle)
  setFavicon()
}

// 恢复默认
export const resetTitle = () => {
  clearTimeout(rollTimer)
  clearTimeout(faviconTimer)
  favicon && favicon.reset()
  document.title = reallyTitle
}
