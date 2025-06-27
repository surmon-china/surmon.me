/**
 * @file Base64 and Base64URL utilities
 * @module transform/base64
 * @author Surmon <https://github.com/surmon-china>
 */

export const base64Encode = btoa
export const base64Decode = atob

export const base64UrlEncode = (value: string): string => {
  return base64Encode(value)
    .replace(/=/g, '') // remove '='
    .replace(/\+/g, '-') // '+' > '-'
    .replace(/\//g, '_') // '/' > '_'
}

export const base64UrlDecode = (value: string): string => {
  try {
    const base64 = value
      .replace(/-/g, '+') // '-' > '+'
      .replace(/_/g, '/') // '_' > '/'

    const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return base64Decode(paddedBase64)
  } catch (error) {
    throw new Error('Illegal Base64URL string!')
  }
}
