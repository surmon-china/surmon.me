/**
 * @file query string
 * @module transforms.qs
 * @author Surmon <https://github.com/surmon-china>
 */

export const stringify = (object: any, sep = '&', eq = '=') => {
  let str = ''
  for (let k in object) {
    if (object.hasOwnProperty(k)) {
      let value = object[k]
      if (value === null || value === undefined) continue
      let encodedKey = encodeURIComponent(k)
      let encodedValue = encodeURIComponent(value)
      str += encodedKey + eq + encodedValue + sep
    }
  }

  return str.slice(0, -1)
}

export const parse = (string) => {
  // TODO..
}
