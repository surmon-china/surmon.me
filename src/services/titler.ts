/**
 * @file Title surprise
 * @module service.titler
 * @author Surmon <https://github.com/surmon-china>
 */

import { renderTextToDataURL } from '/@/utils/text-2-image'

// matcher
export interface Titler {
  day: number
  month: number
  year: number
  title: string
  favicon: string
}

const matchTitler = (titlers: Array<Titler>) => {
  const now = new Date()
  const today = now.getDate()
  const tomonth = now.getMonth() + 1
  const toyear = now.getFullYear()
  return titlers.find((egg) => {
    const isToday = egg.day === today
    const isTomonth = egg.month == null || egg.month === tomonth
    const isToyear = egg.year == null || egg.year === toyear
    return isToday && isTomonth && isToyear
  })
}

// roll
let rollTimer: number
const titleInterval = 366
const setTitle = (title: string) => {
  document.title = title
  if (title.length <= 10) {
    return false
  }
  const [first, ...content] = title.split('')
  const newTitle = [...content, first].join('')
  rollTimer = window.setTimeout(() => setTitle(newTitle), titleInterval)
}

// favicon
const getFavicon = () => {
  return Array.from(document.getElementsByTagName('link'))
    .find((node) => node.getAttribute('rel') == 'icon')
    ?.getAttribute('href')
}
const setFavicon = async (target) => {
  Array.from(document.getElementsByTagName('link'))
    .find((node) => node.getAttribute('rel') == 'icon')
    ?.setAttribute('href', target)
}

const reallyFavicon = getFavicon()!
let reallyTitle = document.title

export const resetTitler = () => {
  document.title = reallyTitle
  setFavicon(reallyFavicon)
}

export const runTitler = async ({ favicon, title }) => {
  reallyTitle = document.title
  document.title = title
  setFavicon(await renderTextToDataURL(favicon, 28))
}
