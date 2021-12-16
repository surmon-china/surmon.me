/**
 * @file Clipboard util
 * @module util.clipboard
 * @author Surmon <https://github.com/surmon-china>
 */

declare global {
  interface Window {
    $isCopyFromApp: boolean
  }
}

export const read = () => navigator.clipboard.readText()
export const copy = (text: string) => {
  window.$isCopyFromApp = true
  // https://www.w3.org/TR/clipboard-apis/#async-clipboard-api
  // only https site
  window.navigator.clipboard?.writeText(text).finally(() => {
    window.$isCopyFromApp = false
  })
}

export default { copy, read }
