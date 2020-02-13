/**
 * @file Url 彩蛋 / ES module
 * @module services/url-egg
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment'

let eggTimer: number
const replaceLocation = (emoji: string) => {
  if (isBrowser) {
    const path = window.$nuxt.$route.path
    // location.hash = emoji
    // window.$nuxt.$router.replace(`${path}${emojis ? ('#' + emojis) : ''}`)
  }
}

const eggs = [
  () => {
    const emojis = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘']
    const loopEmojis = () => {
      replaceLocation(emojis[Math.floor((Date.now() / 100) % emojis.length)])
      eggTimer = window.setTimeout(loopEmojis, 66)
    }
    loopEmojis()
  },
  () => {
    const emojis = ['🏻', '🏼', '🏽', '🏾', '🏿']
    const loopEmojis = () => {
      let emoji = ''
      for (let i = 0; i < 10; i++) {
        const index = Math.floor(
          emojis.length * ((Math.sin(Date.now() / 100 + i) + 1) / 2)
        )
        emoji += '👶' + emojis[index]
      }
      replaceLocation(emoji)
      window.setTimeout(loopEmojis, 66)
    }
    loopEmojis()
  }
]

export const startUrlEgg = () => {
  if (isBrowser) {
    const egg = eggs[1]
    egg()
  }
}

export const stopUrlEgg = () => {
  clearTimeout(eggTimer)
  replaceLocation('')
}
