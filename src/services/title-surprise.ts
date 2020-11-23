/**
 * @file Title surprise
 * @module service/title-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import FavicoClass from '/@/patchs/favico'
import { isClient } from '/@/environment'
import { titles } from '/@/config/egg.config'

const Favico = FavicoClass as any

let favicon: any = null
let faviconTimer: number
let rollTimer: number
let eggTitle = ''
let faviconText = ''
let reallyTitle = isClient ? document.title : ''

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

// Normal
export const startTitleEffect = () => {
  reallyTitle = document.title
  setTitle(eggTitle)
  setFavicon()
}

export const resetTitle = () => {
  window.clearTimeout(rollTimer)
  window.clearTimeout(faviconTimer)
  favicon && favicon.reset()
  document.title = reallyTitle
}

// Simple
export const setEasyTitleEffect = () => {
  reallyTitle = document.title
  document.title = 'Uncensored - Pornhub.com'
  favicon = new Favico({ type: 'rectangle', animation: 'popFade' })
  favicon.badge('PH')
}

export const resetEasyTitle = () => {
  favicon && favicon.reset()
  document.title = reallyTitle
}

export const enableAutoTitleSurprise = () => {
  document.addEventListener('visibilitychange', event => {
      // @ts-ignore
      event.target?.hidden || event.target?.webkitHidden
        ? setEasyTitleEffect()
        : resetEasyTitle()
    },
    false
  )
}
