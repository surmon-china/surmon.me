import { nextTick } from 'vue'
import { isClient } from '/@/vuniversal/env'
import { scrollTo, Easing } from './scroller'

export const nextScreen = () => {
    // if (isClient) {
    nextTick(() => {
      scrollTo(window.scrollY + window.innerHeight * 0.68, 300, {
        easing: Easing['ease-in']
      })
    })
  // }
}


