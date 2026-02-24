/**
 * @file Window opener
 * @module util/opener
 * @author Surmon <https://github.com/surmon-china>
 */

const baseParams = {
  scrollbars: 0,
  status: 0,
  menubar: 0,
  resizable: 2,
  location: 0
}

const paramsToString = (params: any = {}) => {
  return Object.keys(params)
    .map((k) => `${k}=${params[k]}`)
    .join(',')
}

export interface WindowOpenerOptions {
  target?: string
  width?: number
  height?: number
  closeInterval?: number
  onClose?(): void
  params?: {
    [key: string]: string
  }
}

export const openPopupWindow = (targetUrl: string, options: WindowOpenerOptions = {}) => {
  const {
    target = '',
    closeInterval = 268,
    onClose,
    width: customWidth,
    height: customHeight,
    params = {}
  } = options

  const width = customWidth ?? Math.round((screen.availWidth / 6) * 2)
  const height = customHeight ?? Math.round((screen.availHeight / 5) * 2)
  const top = Math.round((screen.availHeight - height) / 2)
  const left = Math.round((screen.availWidth - width) / 2)
  const formParams = { width, height, top, left }

  const windowParams = paramsToString({
    ...baseParams,
    ...formParams,
    ...params
  })

  const popupWindow = window.open(targetUrl, target, windowParams)
  if (popupWindow) {
    if (onClose) {
      const timer = setInterval(() => {
        if (popupWindow?.closed) {
          clearInterval(timer)
          onClose()
        }
      }, closeInterval)
    }
    popupWindow?.focus()
    return popupWindow
  }
}

export const openNewWindow = (targetUrl: string, target?: string) => {
  return window.open(targetUrl, target)
}
