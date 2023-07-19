/**
 * @file Title surprise
 * @module effect.titler
 * @author Surmon <https://github.com/surmon-china>
 */

import { renderTextToDataURL } from '/@/transforms/text-2-image'

// title
let rollTimer: number
const setTitle = (title: string) => {
  document.title = title
  if (title.length <= 10) {
    return false
  }
  const [first, ...content] = title.split('')
  const newTitle = [...content, first].join('')
  rollTimer = window.setTimeout(() => setTitle(newTitle), 366)
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

const cache = {
  favicon: getFavicon()!,
  title: document.title
}

export const resetTitler = () => {
  setFavicon(cache.favicon)
  document.title = cache.title
  window.clearTimeout(rollTimer)
}

export const runTitler = async ({ favicon, title }) => {
  cache.title = document.title
  cache.favicon = getFavicon()!
  setTitle(title + ' ')
  setFavicon(await renderTextToDataURL(favicon, 28))
}
