/**
 * @file Title dancer
 * @module effect/titler
 * @author Surmon <https://github.com/surmon-china>
 */

let rollTimer: number | null = null
let originalTitle = document.title

const _clearRollTimer = () => {
  if (rollTimer !== null) {
    window.clearTimeout(rollTimer)
    rollTimer = null
  }
}

const _rollTitle = (title: string, interval: number) => {
  document.title = title
  if (title.length <= 10) return

  const newTitle = title.substring(1) + title.substring(0, 1)
  rollTimer = window.setTimeout(() => _rollTitle(newTitle, interval), interval)
}

export const rollTitle = (title: string, interval = 366) => {
  if (rollTimer === null) {
    originalTitle = document.title
  } else {
    _clearRollTimer()
  }

  _rollTitle(title.trim() + ' ', interval)
}

export const setTitle = (title: string) => {
  _clearRollTimer()
  originalTitle = document.title
  document.title = title
}

export const recoverTitle = () => {
  _clearRollTimer()
  document.title = originalTitle
}
