/**
 * @file Text transformer
 * @module transformer/text
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

export const CHINESE_NUMBER_TEXT = '〇一二三四五六七八九十'.split('')
export const CHINESE_NUMBER_CAPITAL_TEXT = '零壹贰叁肆伍陆柒捌玖拾'.split('')
export const replaceToChineseNumber = (text: string | number, capital = false) => {
  const targetText = capital ? CHINESE_NUMBER_CAPITAL_TEXT : CHINESE_NUMBER_TEXT
  return String(text)
    .split('')
    .map(number => targetText[Number(number)])
    .join('')
}

export const CHINESE_MONTH_TEXT = [
  '首阳',
  '绀香',
  '莺时',
  '槐序',
  '鸣蜩',
  '季夏',
  '兰秋',
  '南宫',
  '菊月',
  '子春',
  '葭月',
  '季冬'
]
export const toChineseMonth = (number: number) => {
  return CHINESE_MONTH_TEXT[number - 1]
}

export const ENG_MONTH_TEXT = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
export const toEngMonth = (number: number) => {
  return ENG_MONTH_TEXT[number - 1]
}
