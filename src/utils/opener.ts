/**
 * @file Window opener
 * @module util.opener
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
  name?: string
  onClose?(): void
  closeInterval?: number
  params?: {
    [key: string]: string
  }
}
export const openWindow = (targetURL: string, options: WindowOpenerOptions = {}) => {
  const { name = '', closeInterval = 268, onClose, params = {} } = options
  const width = Math.round((screen.availWidth / 6) * 2)
  const height = Math.round((screen.availHeight / 5) * 2)
  const top = Math.round((screen.availHeight - height) / 2)
  const left = Math.round((screen.availWidth - width) / 2)
  const formParams = { width, height, top, left }
  const windowParams = paramsToString({
    ...baseParams,
    ...formParams,
    ...params
  })

  const _window = window.open(targetURL, name, windowParams)
  if (_window) {
    if (onClose) {
      const timer = setInterval(() => {
        if (_window.closed) {
          clearInterval(timer)
          onClose()
        }
      }, closeInterval)
    }
    _window?.focus()
    return _window
  }
}
