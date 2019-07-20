/**
 * @file Time Filters / ES module
 * @module transforms/time-filter
 * @author Surmon <https://github.com/surmon-china>
 */

import systemConstants from '~/constants/system'

// 取剩余秒
const pluralize = (time, label, isEnLang) => {
  return time + label + (isEnLang ? ' ago' : '前')
}

// 转换为本地时间格式
export const toLocalString = date => {
  return date ? new Date(date).toLocaleString() : date
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeAgo = (time, language) => {
  const isEnLang = language && language === systemConstants.Language.En
  time = time instanceof Date ? time : new Date(time)
  const between = Date.now() / 1000 - (Number(time) / 1000)
  if (between < 3600) {
    return Object.is(~~(between / 60), 0)
      ? isEnLang ? 'just now' : '刚刚'
      : pluralize(~~(between / 60), (isEnLang ? ' minutes' : ' 分钟'), isEnLang)
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), (isEnLang ? ' hours' : ' 小时'), isEnLang)
  } else {
    return pluralize(~~(between / 86400), (isEnLang ? ' days' : ' 天'), isEnLang)
  }
}

// YMDHMS 时间转换过滤器
export const toYMD = (date, language) => {
  if (!date) return date
  date = new Date(date)
  const am = (language && language === systemConstants.Language.En) ? 'am' : '上午'
  const pm = (language && language === systemConstants.Language.En) ? 'pm' : '下午'
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() > 11 ? pm : am
  return `${year}/${month}/${day} ${hour}`
}
