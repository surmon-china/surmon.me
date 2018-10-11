/**
 * @file Time Filters / ES module
 * @module filters/time-filter
 * @author Surmon <https://github.com/surmon-china>
 */

// 取剩余秒
const pluralize = (time, label, en) => {
  return time + label + (en ? ' ago' : '前')
}

// 转换为本地时间格式
export const toLocalString = date => {
  return date ? new Date(date).toLocaleString() : date
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeAgo = (time, language) => {
  const en = language && language === 'en'
  time = time instanceof Date ? time : new Date(time)
  const between = Date.now() / 1000 - (Number(time) / 1000)
  if (between < 3600) {
    return Object.is(~~(between / 60), 0)
      ? en ? 'just now' : '刚刚'
      : pluralize(~~(between / 60), (en ? ' minutes' : ' 分钟'), en)
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), (en ? ' hours' : ' 小时'), en)
  } else {
    return pluralize(~~(between / 86400), (en ? ' days' : ' 天'), en)
  }
}

// YMDHMS 时间转换过滤器
export const toYMD = (date, language) => {
  if (!date) return date
  date = new Date(date)
  const am = (language && language === 'en') ? 'am' : '上午'
  const pm = (language && language === 'en') ? 'pm' : '下午'
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() > 11 ? pm : am
  return `${year}/${month}/${day} ${hour}`
}
