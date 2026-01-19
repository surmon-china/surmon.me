// For Android browsers. e.g. WeChat webview
// MDN: https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static
// Fork from: https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/web.url.can-parse.js
if (!URL.canParse) {
  URL.canParse = function (url: string, base?: string) {
    if (!url) throw new TypeError('Not enough arguments')
    try {
      return !!new URL(String(url), base ? String(base) : void 0)
    } catch (error) {
      return false
    }
  }
}
