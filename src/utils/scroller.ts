/**
 * @file Scroll to anywhere
 * @module util.scroller
 * @author Surmon <https://github.com/surmon-china>
 */

import { nextTick } from 'vue'
import BezierEasing from 'bezier-easing'

export const Easing = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0, 0.0, 1, 1.0],
  easeIn: [0.42, 0.0, 1, 1.0],
  easeOut: [0, 0.0, 0.58, 1.0],
  easeInOut: [0.42, 0.0, 0.58, 1.0]
}

const triggerEvents: string[] = [
  'scroll',
  'mousedown',
  'wheel',
  'DOMMouseScroll',
  'mousewheel',
  'keyup',
  'touchmove'
]

const listener = {
  on(element: Element, events: string[], handler: () => void) {
    events.forEach((event) => {
      element.addEventListener(event, handler, { passive: true })
    })
  },
  off(element: Element, events: string[], handler: () => void) {
    events.forEach((event) => {
      element.removeEventListener(event, handler)
    })
  }
}

export interface ScrollToElementOptions {
  target: string | Element
  offset?: number
  duration?: number
  easing?: number[]
  onCancel?(): void
  onDone?(): void
}

export const scrollToElement = (options: ScrollToElementOptions) => {
  const { target, onCancel, onDone } = options
  const offset = options.offset ?? 0
  const duration = options.duration ?? 500
  const optionEasing = options.easing ?? Easing.ease
  const targetElement = typeof target === 'string' ? document.querySelector(target)! : target
  const bodyElement = document.body

  let abort = false
  const whenAbort = () => {
    abort = true
  }

  listener.on(bodyElement, triggerEvents, whenAbort)

  const whenDone = () => {
    listener.off(bodyElement, triggerEvents, whenAbort)
    abort ? onCancel?.() : onDone?.()
  }

  const initialY = window.pageYOffset
  const elementY = initialY + targetElement.getBoundingClientRect().top
  const targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY

  const diff = targetY + offset - initialY
  if (!diff) {
    return
  }

  const easing = Reflect.apply(BezierEasing, BezierEasing, optionEasing)
  let start: number

  window.requestAnimationFrame(function step(timestamp) {
    if (abort) {
      return whenDone()
    }
    if (!start) {
      start = timestamp
    }

    const time = timestamp - start
    let progress = Math.min(time / duration, 1)
    progress = easing(progress)

    window.scrollTo(0, initialY + diff * progress)

    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      whenDone()
    }
  })
}

export const scrollToAnchor = (elementId: string, offset?: number) => {
  const targetElement = document.getElementById(elementId)
  if (targetElement) {
    scrollToElement({
      target: targetElement,
      duration: 200,
      // default offset: header height
      offset: offset ?? -74
    })
  }
}

export const scrollToPageTop = () => {
  scrollToElement({
    target: document.body,
    duration: 280,
    offset: 0,
    // MARK: keep ease
    easing: Easing.ease
  })
}

export const scrollToNextScreen = () => {
  nextTick(() => {
    scrollToElement({
      target: document.body,
      offset: window.scrollY + window.innerHeight * 0.68,
      duration: 300,
      easing: Easing.easeIn
    })
  })
}
