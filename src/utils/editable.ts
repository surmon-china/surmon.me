/**
 * @file Editable element util
 * @module util.editable
 * @author Surmon <https://github.com/surmon-china>
 */

export const focusPosition = (element: HTMLElement, position = 0) => {
  if (!element) {
    return
  }

  // 1. focus
  element.focus()

  // 2. position (first text position)
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

  // If the text is selected, replace the selected text
  const currentText = element.innerText
  const selection = (window.getSelection || document.getSelection)() as Selection
  const selectedText = selection?.toString()
  if (selectedText) {
    // Replaces all selected text, and then locates the last character of the replaced text.
    // For Selected logic, any single character in a given is understood as a substitution
    const isInsertReplace = !!before && !after
    const newSelectedText = isInsertReplace ? before : before + selectedText + after
    const newText = currentText.replace(selectedText, newSelectedText)
    element.innerText = newText
    focusPosition(element, newText.indexOf(newSelectedText) + newSelectedText.length - 1)
  } else {
    // Otherwise, add a new element
    const newInsertText = before + after
    const selectedRange = (() => {
      try {
        return selection.getRangeAt(0)
      } catch (error) {}
    })() as Range
    const startPoint = selectedRange?.startOffset
    const endPoint = selectedRange?.endOffset

    // Insert new content at the cursor position, then position to the last character of the new content
    if (selectedRange && startPoint === endPoint && startPoint > 0) {
      const newTexts = [currentText.slice(0, startPoint), newInsertText, currentText.slice(startPoint)]
      element.innerText = newTexts.join('')
      focusPosition(element, newTexts[0].length + newTexts[1].length - 1)
    } else {
      // Otherwise append at the end and position to the last character
      const newText = currentText + newInsertText
      element.innerText = newText
      focusPosition(element, newText.length - 1)
      // TODO:????
      // element.scrollIntoView()
      // element?.scrollTop = element?.scrollHeight
    }
  }
}
