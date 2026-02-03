export const getScrollbarWidth = (): number => {
  // 1. outside box
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  // 2. inside box
  const inner = document.createElement('div')
  outer.appendChild(inner)

  // 3. calc width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // 4. remove boxs
  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}
