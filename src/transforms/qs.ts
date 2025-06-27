/**
 * @file query string
 * @module transforms/qs
 * @author Surmon <https://github.com/surmon-china>
 */

export const stringify = (object: any, sep = '&', eq = '=') => {
  let str = ''
  for (const k in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(k)) {
      const value = object[k]
      if (value === null || value === undefined) continue
      const encodedKey = encodeURIComponent(k)
      const encodedValue = encodeURIComponent(value)
      str += encodedKey + eq + encodedValue + sep
    }
  }

  return str.slice(0, -1)
}

export const parse = (string) => {
  // TODO..
}
