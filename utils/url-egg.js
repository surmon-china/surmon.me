/**
 * @file Url 彩蛋 / ES module
 * @module utils/url-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment/esm'

let eggTimer = null
const replaceLocation = emoji => {
  if (isBrowser) {
    const path = window.$nuxt.$route.path
    // location.hash = emoji
    // window.$nuxt.$router.replace(`${path}${emojis ? ('#' + emojis) : ''}`)
  }
}

const eggs = [
  function() {
    const emojis = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘']
    const loopEmojis = () => {
      replaceLocation(emojis[Math.floor((Date.now() / 100) % emojis.length)])
      eggTimer = setTimeout(loopEmojis, 66)
    }
    loopEmojis()
  },
  function() {
    const emojis = ['🏻', '🏼', '🏽', '🏾', '🏿']
    const loopEmojis = () => {
      let emoji = ''
      for (let i = 0; i < 10; i++) {
        const index = Math.floor(emojis.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        emoji += '👶' + emojis[index];
      }
      replaceLocation(emoji)
      setTimeout(loopEmojis, 66)
    }
    loopEmojis()
  },
]

export const startUrlEgg = () => {
  if (isBrowser) {
    const egg = eggs[1]
    egg()
  }
}

export const stopUrlEgg = () => {
  clearTimeout(eggTimer)
  replaceLocation()
}
