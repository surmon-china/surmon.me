"use strict"

let BezierEasing = require("bezier-easing")

let _ = {
  $(selector) {
    return document.querySelector(selector)
  },
  on(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events]
    }
    for (let i = 0; i < events.length; i++) {
      element.addEventListener(events[i], handler)
    }
  },
  off(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events]
    }
    for (let i = 0; i < events.length; i++) {
      element.removeEventListener(events[i], handler)
    }
  }
}

exports.easing = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0.00, 0.0, 1.00, 1.0],
  "ease-in": [0.42, 0.0, 1.00, 1.0],
  "ease-out": [0.00, 0.0, 0.58, 1.0],
  "ease-in-out": [0.42, 0.0, 0.58, 1.0]
}

exports.scrollTo = (element, duration = 500, options) => {

	options = options || {}
	options.easing = exports.easing["ease"] 

  if (typeof element === "string") {
      element = _.$(element)
  }

  let page = _.$("html, body")
  let events = [
      "scroll",
      "mousedown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "keyup",
      "touchmove"
  ]
  let abort = false

  let abortFn = function() {
      abort = true
  }

  _.on(page, events, abortFn)

  let initialY = window.pageYOffset
  let elementY = 0
  if (Object.is(typeof element, 'number')) {
    elementY = element
  } else {
    elementY = initialY + element.getBoundingClientRect().top
  }
  let targetY = document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY

  if (options.offset) {
    targetY += options.offset
  }

  let diff = targetY - initialY
  let easing = BezierEasing.apply(BezierEasing, options.easing)
  let start

  let done = function() {
    _.off(page, events, abortFn)
    if (abort && options.onCancel) options.onCancel()
    if (!abort && options.onDone) options.onDone()
  }

  if (!diff) return

  window.requestAnimationFrame(function step(timestamp) {
    if (abort) return done()
    if (!start) start = timestamp

    let time = timestamp - start
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
