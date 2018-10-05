/**
 * @file Text Filters / ES module
 * @author Surmon <surmon@foxmail.com>
 */

// 文字溢出过滤器
export const textOverflow = (text, length) => {
  const _length = length || text.length
  const cansub = _length && text && (text.length) > _length
  return cansub ? (text.substr(0, _length) + '...') : text
}

// 首字母大写
export const firstUpperCase = str => {
  return !!str ? str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : str
}
