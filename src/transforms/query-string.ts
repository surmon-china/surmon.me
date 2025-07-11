/**
 * @file query string
 * @module transforms/query-string
 * @author Surmon <https://github.com/surmon-china>
 */

export const stringify = (object: any, sep = '&', eq = '=') => {
  let result = ''
  for (const k in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(k)) {
      const value = object[k]
      if (value === null || value === undefined) continue
      const encodedKey = encodeURIComponent(k)
      const encodedValue = encodeURIComponent(value)
      result += encodedKey + eq + encodedValue + sep
    }
  }

  return result.slice(0, -1)
}

export const parse = (query: string): Record<string, string | string[]> => {
  const result: Record<string, string | string[]> = {}
  if (!query) return result

  query
    .replace(/^\?/, '')
    .split('&')
    .forEach((part) => {
      if (!part) return
      const [rawKey, rawValue] = part.split('=', 2)
      const key = decodeURIComponent(rawKey)
      const value = decodeURIComponent(rawValue ?? '')
      if (key in result) {
        const existing = result[key]
        result[key] = Array.isArray(existing) ? [...existing, value] : [existing, value]
      } else {
        result[key] = value
      }
    })

  return result
}
