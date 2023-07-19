/**
 * @file Generate text to image DataURL
 * @module transforms.text2image
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/albinekb/favicon-emoji/blob/master/lib/browser.js
 */

const trimCanvas = (canvas: HTMLCanvasElement) => {
  const rowBlank = (imageData, width, y) => {
    for (let x = 0; x < width; ++x) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false
    }
    return true
  }

  const columnBlank = (imageData, width, x, top, bottom) => {
    for (let y = top; y < bottom; ++y) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false
    }
    return true
  }

  const context = canvas.getContext('2d')!
  const width = canvas.width
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  let top = 0
  let bottom = imageData.height
  let left = 0
  let right = imageData.width

  while (top < bottom && rowBlank(imageData, width, top)) {
    ++top
  }
  while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) {
    --bottom
  }
  while (left < right && columnBlank(imageData, width, left, top, bottom)) {
    ++left
  }
  while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) {
    --right
  }

  const trimmed = context.getImageData(left, top, right - left, bottom - top)
  const max = Math.max(trimmed.width, trimmed.height)

  const copy = Object.assign(document.createElement('canvas'), {
    width: max,
    height: max
  })

  const copyCtx = copy.getContext('2d')!
  copyCtx.putImageData(trimmed, (max - trimmed.width) / 2, (max - trimmed.height) / 2)
  return copy
}

export async function renderTextToDataURL(text = '', size = 16) {
  const canvas = Object.assign(document.createElement('canvas'), {
    width: size * 2,
    height: size * 2
  })
  const context = canvas.getContext('2d')!
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = `${size}px Apple Color Emoji`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, (size * 2) / 2, (size * 2) / 2)

  return trimCanvas(canvas).toDataURL('image/png')
}
