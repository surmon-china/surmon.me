/**
 * @file Base64 and Base64URL utilities
 * @module transform/base64
 * @author Surmon <https://github.com/surmon-china>
 */

export const base64Encode = btoa
export const base64Decode = atob

const BASE64_STD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const BASE64_CUSTOM = 'ZYXWVUTSRQPONMLKJIHGFEDCBAabcdefghijklmnopqrstuvwxyz0123456789-_='

export const safeBase64UrlEncode = (value: string): string => {
  const base64 = base64Encode(value)
  const customMapped = [...base64]
    .map((c) => {
      const idx = BASE64_STD.indexOf(c)
      return idx === -1 ? c : BASE64_CUSTOM[idx]
    })
    .join('')

  return customMapped.replace(/=+$/, '')
}

export const safeBase64UrlDecode = (value: string): string => {
  try {
    const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), '=')
    const stdMapped = [...padded]
      .map((c) => {
        const idx = BASE64_CUSTOM.indexOf(c)
        return idx === -1 ? c : BASE64_STD[idx]
      })
      .join('')

    return base64Decode(stdMapped)
  } catch {
    throw new Error('Illegal Base64URL string!')
  }
}

// const testCases = [
//   'Hello World',
//   // '测试中文编码',
//   'Special: +/=?&@#',
//   '???',
//   'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
//   `{"user":"test","data":[1,2,3]}`,
//   '',
//   'localhost',
//   '//////',
//   '++++++',
//   '======',
//   '//++==',
//   'https://example.com/path?param=value',
//   'https://example.com///xxxxxx//xxxx?&_time=1234567890&foo=bar'
// ]

// testCases.forEach((original) => {
//   const encoded = safeBase64UrlEncode(original)
//   const decoded = safeBase64UrlDecode(encoded)
//   const ok = decoded === original
//   console.group(ok ? '✅ Test Passed' : '❌ Test Failed')
//   console.table({ original, decoded, encoded })
//   console.groupEnd()
// })
