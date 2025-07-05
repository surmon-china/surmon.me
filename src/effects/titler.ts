/**
 * @file Title surprise
 * @module effect/titler
 * @author Surmon <https://github.com/surmon-china>
 */

import { renderTextToDataURL } from '/@/transforms/text-2-image'

// title
let rollTimer: number
const rollTitle = (title: string) => {
  document.title = title
  if (title.length <= 10) {
    return false
  }
  const [first, ...content] = title.split('')
  const newTitle = [...content, first].join('')
  rollTimer = window.setTimeout(() => rollTitle(newTitle), 366)
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

export const setStaticTitler = async ({ favicon, title }) => {
  cache.title = document.title
  cache.favicon = getFavicon()!
  document.title = title
  setFavicon(await renderTextToDataURL(favicon, 26))
}

export const runDynamicTitler = async ({ favicon, title }) => {
  cache.title = document.title
  cache.favicon = getFavicon()!
  rollTitle(title + ' ')
  setFavicon(await renderTextToDataURL(favicon, 26))
}
