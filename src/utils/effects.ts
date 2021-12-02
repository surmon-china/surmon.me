/**
 * @file Client util
 * @module util.effects
 * @author Surmon <https://github.com/surmon-china>
 */

import { nextTick } from 'vue'
import { scrollTo, Easing } from './scroller'

export const scrollToTop = () => {
  scrollTo('body', 300, { easing: Easing.easeIn })
}

export const nextScreen = () => {
  nextTick(() => {
    scrollTo(window.scrollY + window.innerHeight * 0.68, 300, {
      easing: Easing['ease-in']
    })
  })
}
