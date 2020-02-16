/**
 * @file Title 彩蛋 / ES module
 * @module services/title-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import Favico from '~/plugins/favico'
import { isBrowser } from '~/environment'
import { titles } from '~/config/egg.config'

let favicon: Favico = null
let faviconTimer: number
let rollTimer: number
let eggTitle = ''
let faviconText = ''
let reallyTitle = isBrowser ? document.title : ''

const now = new Date()
const today = now.getDate()
const tomonth = now.getMonth() + 1
const toyear = now.getFullYear()
const defaultEgg = `你好啊，陌生人，今天是 ${tomonth} 月 ${today} 日，又是有趣的一天`
const defaultFaviconText = '来苏之望'
const titleInterval = 366
const favInterval = 466

const matchedEgg = titles.find(egg => {
  const isToday = egg.day === today
  const isTomonth = egg.month == null || egg.month === tomonth
  const isToyear = egg.year == null || egg.year === toyear
  return isToday && isTomonth && isToyear
})

eggTitle = matchedEgg && matchedEgg.title
  ? matchedEgg.title
  : defaultEgg
faviconText = matchedEgg && matchedEgg.favicon
  ? matchedEgg.favicon
  : defaultFaviconText

// 滚动器
const setTitle = (title: string) => {
  document.title = title
  if (title.length <= 10) {
    return false
  }
  const [first, ...content] = title.split('')
  const newTitle = [...content, first].join('')
  rollTimer = window.setTimeout(() => setTitle(newTitle), titleInterval)
}

const setFavicon = () => {
  favicon = new Favico({ type: 'rectangle', animation: 'popFade' })
  let index = 0
  const positions = ['upleft', 'up', 'down', 'left']
  const words = faviconText.split('')
  const doSetFavicon = () => {
    const text = words[index % words.length]
    const position = positions[index % positions.length]
    favicon.badge(text, { position })
    index++
    faviconTimer = window.setTimeout(doSetFavicon, favInterval)
  }
  doSetFavicon()
}

// 彩蛋
// export const startTitleEgg = () => {
//   reallyTitle = document.title
//   setTitle(eggTitle)
//   setFavicon()
// }

// 恢复默认
// export const resetTitle = () => {
//   window.clearTimeout(rollTimer)
//   window.clearTimeout(faviconTimer)
//   favicon && favicon.reset()
//   document.title = reallyTitle
// }

// 仅启用简易版
export const startTitleEgg = () => {
  reallyTitle = document.title
  document.title = 'Uncensored - Pornhub.com'
  favicon = new Favico({ type: 'rectangle', animation: 'popFade' })
  favicon.badge('PH')
}

export const resetTitle = () => {
  favicon && favicon.reset()
  document.title = reallyTitle
}
