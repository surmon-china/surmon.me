/**
 * @file 滑动到任何目的地 / ES module
 * @module services/scroller
 * @author Surmon <https://github.com/surmon-china>
 */

const BezierEasing = require('bezier-easing')
type ElementEvents = string[]

const _ = {
  $(selector: string) {
    return document.querySelector(selector)
  },
  on(element: Element, events: ElementEvents, handler: $TODO) {
    if (!Array.isArray(events)) {
      events = [events]
    }
    events.forEach(event => {
      element.addEventListener(event, handler, { passive: true })
    })
  },
  off(element: Element, events: ElementEvents, handler: $TODO) {
    if (!Array.isArray(events)) {
      events = [events]
    }
    events.forEach(event => {
      element.removeEventListener(event, handler)
    })
  }
}

export const Easing = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0, 0.0, 1, 1.0],
  'ease-in': [0.42, 0.0, 1, 1.0],
  'ease-out': [0, 0.0, 0.58, 1.0],
  'ease-in-out': [0.42, 0.0, 0.58, 1.0]
}

export const scrollTo = (target: string | number | Element, duration = 500, options: $TODO) => {
  options = options || {}
  options.easing = Easing.ease

  const page = _.$('html, body') as Element
  const events: ElementEvents = [
    'scroll',
    'mousedown',
    'wheel',
    'DOMMouseScroll',
    'mousewheel',
    'keyup',
    'touchmove'
  ]

  let abort = false

  const abortFn = function() {
    abort = true
  }

  _.on(page, events, abortFn)

  let elementY = 0
  const initialY = window.pageYOffset

  if (typeof target === 'number') {
    elementY = target
  } else {
    const element = (typeof target === 'string'
      ? _.$(target)
      : target) as Element
    elementY = initialY + element.getBoundingClientRect().top
  }

  let targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY

  if (options.offset) {
    targetY += options.offset
  }

  const diff = targetY - initialY
  const easing = Reflect.apply(BezierEasing, BezierEasing, options.easing)
  let start: number

  const done = function() {
    _.off(page, events, abortFn)
    if (abort && options.onCancel) {
      options.onCancel()
    }
    if (!abort && options.onDone) {
      options.onDone()
    }
  }

  if (!diff) return

  window.requestAnimationFrame(function step(timestamp) {
    if (abort) return done()
    if (!start) start = timestamp

    const time = timestamp - start
    let progress = Math.min(time / duration, 1)
    progress = easing(progress)

    window.scrollTo(0, initialY + diff * progress)

    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      done()
    }
  })
}
