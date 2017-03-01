/*
*
* 时间格式化过滤器
*
* Description
*
*/

// 取剩余秒
const pluralize = (time, label) => {
  return time + label + '前'
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeAgo = time => {
  time = time instanceof Date ? time : new Date(time)
  const between = Date.now() / 1000 - (Number(time) / 1000)
  if (between < 3600) {
    if (Object.is(~~(between / 60), 0)) return '刚刚'
    return pluralize(~~(between / 60), ' 分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时')
  } else {
    return pluralize(~~(between / 86400), ' 天')
  }
}

// 转换为本地时间格式
export const toLocalString = date => {
  return date ?  new Date(date).toLocaleString() : date
}

// YMDHMS时间转换过滤器
export const toYMD = date => {
  if (!date) return date
  date = new Date(date)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 11 ? '下午' : '上午'}`
}

// 秒转为小时分钟过滤器
export const toHMS = (sec, type, h_slug, m_slug, s_slug) => {

  // 计算
  const sec_num = parseInt(sec, 10)
  const hours   = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  const seconds = sec_num - (hours * 3600) - (minutes * 60)

  // 低级格式化
  [seconds, minutes, hours].forEach(time => { (time < 10) && (time = `0${time}`) })

  // 显示规则
  let hour_display, minute_display, second_display
  if (type) {
    hour_display = type.indexOf("H") > -1 && hours > 0 ? true : false
    minute_display = type.indexOf("M") > -1 ? true : false
    second_display = type.indexOf("S") > -1 ? true : false
  } else {
    hour_display = minute_display = second_display = true
  }

  // 自定义格式化
  const hour_slug   = h_slug != undefined ? h_slug : ':'
  const minute_slug = m_slug != undefined ? m_slug : ':'
  const second_slug = s_slug != undefined ? s_slug : ''

  const time = (hour_display ? hours + hour_slug : '') + (minute_display ? minutes + minute_slug : '') + (second_display ? seconds + second_slug : '')
  return time
}
