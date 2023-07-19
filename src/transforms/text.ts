/**
 * @file Text transformer
 * @module transform.text
 * @author Surmon <https://github.com/surmon-china>
 */

import _escape from 'lodash-es/escape'
import _unescape from 'lodash-es/unescape'
import _truncate from 'lodash-es/truncate'
import _capitalize from 'lodash-es/capitalize'
import _padStart from 'lodash-es/padStart'

export const escape = _escape
export const unescape = _unescape
export const padStart = _padStart
export const textOverflow = _truncate
export const firstUpperCase = _capitalize

export function numberToKilo(count: number): string {
  return count > 1000 ? `${parseFloat((count / 1000).toFixed(2))}k` : String(count)
}

export function numberSplit(number: number): string {
  return String(number).replace(/.{1,3}(?=(.{3})+$)/g, '$&,')
}

const CHINESE_NUMBER_TEXT = '〇一二三四五六七八九十'.split('')
const CHINESE_NUMBER_CAPITAL_TEXT = '零壹贰叁肆伍陆柒捌玖拾'.split('')
export const numberToChinese = (text: string | number, capital = false) => {
  const targetText = capital ? CHINESE_NUMBER_CAPITAL_TEXT : CHINESE_NUMBER_TEXT
  return String(text)
    .split('')
    .map((number) => targetText[Number(number)])
    .join('')
}
