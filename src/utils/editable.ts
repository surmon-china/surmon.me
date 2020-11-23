/**
 * @file Editable element util
 * @module util/editable
 * @author Surmon <https://github.com/surmon-china>
 */

export const focusPosition = (element: HTMLElement, position: number = 0) => {
  if (!element) {
    return
  }

  // 1. focus
  element.focus()
  // 2. position
  // first text position
  if (!position) {
    const range = window.getSelection()?.getRangeAt(0) as Range
    const clone = range.cloneRange()
    clone.selectNodeContents(element)
    clone.setEnd(range.endContainer, range.endOffset)
    return clone.toString().length
  }
  // position
  let length = 0
  let abort = false

  const visit = (parentNode: any) => {
    const nodes = parentNode.childNodes
    for (let i = 0; i < nodes.length; ++i) {
      const node = nodes[i]
      const isNewLine = node.nodeType === 1 && node.tagName === 'BR'
      // 文本节点且不是换行
      if (node.nodeType !== 3 && !isNewLine) {
        visit(node)
        return
      }

      length += isNewLine ? 1 : node.textContent.length
      if (length >= position) {
        if (abort) {
          visit(node)
          return
        }

        abort = true
        const selection = document.getSelection() as Selection
        const range = document.createRange()
        const sub = length - node.textContent.length
        range.setStart(node, position - sub)
        range.setEnd(node, position - sub)
        selection.removeAllRanges()
        selection.addRange(range)
        break
      }
    }
  }
  visit(element)
}

export interface IncertOption {
  element: HTMLElement | void
  content: string | [string, string]
}
export const insertContent = (option: IncertOption) => {
  const { element, content } = option
  const [before, after] = Array.isArray(content) ? content : [content]

  if (!element || (!before && !after)) {
    return false
  }

  // 如果选中了内容，则把选中的内容替换，
  const currentText = element.innerText
  const selection = (window.getSelection || document.getSelection)() as Selection
  const selectedText = selection?.toString()
  if (selectedText) {
    // TODO: 正则可能会匹配到重复的前面的字符，故不可靠
    // 替换所有选中文本 -> 然后定位到所替换文本的最后一个字符
    // 对于选中逻辑来说，既定的任何单个字符都理解为替换
    const isInsertReplace = !!before && !after
    const newSelectedText = isInsertReplace
      ? before
      : before + selectedText + after
    const newText = currentText.replace(selectedText, newSelectedText)
    // console.log('选中插入', newText)
    element.innerText = newText
    focusPosition(
      element,
      newText.indexOf(newSelectedText) + newSelectedText.length - 1
    )
  } else {
    // 否则追加新内容
    const newInsertText = before + after
    const selectedRange = (() => {
      // eslint-disable-next-line no-empty
      try { return selection.getRangeAt(0) } catch(error) {}
    })() as Range
    const startPoint = selectedRange?.startOffset
    const endPoint = selectedRange?.endOffset

    // 若拿到了光标，则在光标位置插入新内容 -> 然后定位到新内容的最后一个字符
    if (selectedRange && startPoint === endPoint && startPoint > 0) {
      const newTexts = [
        currentText.slice(0, startPoint),
        newInsertText,
        currentText.slice(startPoint)
      ]
      // console.log('光标插入', startPoint, newTexts)
      element.innerText = newTexts.join('')
      focusPosition(
        element,
        newTexts[0].length + newTexts[1].length - 1
      )
    } else {
      // 否则末端追加内容，并定位到最后一个字符
      const newText = currentText + newInsertText
      // console.log('尾部插入', newText)
      element.innerText = newText
      focusPosition(element, newText.length - 1)
      // TODO:????
      // element.scrollIntoView()
      // element?.scrollTop = element?.scrollHeight
    }
  }
}
