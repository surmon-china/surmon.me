/**
 * @file Url surprise
 * @module service/url-surprise
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from 'vue-router'

export const getUrlSurprise = (router: Router) => {
  let eggTimer: number
  const replaceLocation = (emoji: string) => {
    const path = router.currentRoute.value.path
    // location.hash = emoji
    // window.$nuxt.$router.replace(`${path}${emojis ? ('#' + emojis) : ''}`)
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

  return {
    startUrlEgg() {
      eggs[1]()
    },
    stopUrlEgg() {
      clearTimeout(eggTimer)
      replaceLocation('')
    }
  }
}
