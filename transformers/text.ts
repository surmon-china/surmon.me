/**
 * @file Text transformer / ES module
 * @module transforms/text
 * @author Surmon <https://github.com/surmon-china>
 */

// 文字溢出过滤器
export const textOverflow = (text: string, customLength?: number) => {
  const length = customLength || text.length
  const cansub = length && text?.length > length
  return cansub ? text.substr(0, length) + '...' : text
}

// 首字母大写
export const firstUpperCase = (text: string) => {
  return text?.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}
