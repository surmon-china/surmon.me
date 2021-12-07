/**
 * @file Time transformer
 * @module transformer.moment
 * @author Surmon <https://github.com/surmon-china>
 */

import { Language } from '/@/language/data'

export const TEXT_MAP = {
  AM: {
    [Language.En]: 'am',
    [Language.Zh]: '上午'
  },
  PM: {
    [Language.En]: 'pm',
    [Language.Zh]: '下午'
  },
  AGO: {
    [Language.En]: ' ago',
    [Language.Zh]: '前'
  },
  JUST_NOW: {
    [Language.En]: 'Just now',
    [Language.Zh]: '刚刚'
  },
  MINUTES: {
    [Language.En]: 'minutes',
    [Language.Zh]: '分钟'
  },
  HOURS: {
    [Language.En]: 'hours',
    [Language.Zh]: '小时'
  },
  WEEKS: {
    [Language.En]: 'weeks',
    [Language.Zh]: '周'
  },
  DAYS: {
    [Language.En]: 'days',
    [Language.Zh]: '天'
  },
  MONTHS: {
    [Language.En]: 'months',
    [Language.Zh]: '个月'
  },
  YEARS: {
    [Language.En]: 'years',
    [Language.Zh]: '年'
  },
  WEEKDAYS: {
    [Language.En]: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [Language.Zh]: ['一', '二', '三', '四', '五', '六', '日']
  }
}

export const textHumanizer = (language: Language) => {
  return (langData: any) => langData[language]
}

export const cloneDate = (date: Date) => {
  return new Date(date.getTime())
}

// Deconstruction date
export type HumanDate = ReturnType<typeof dateToHuman>
export const dateToHuman = (date: Date) => {
  const week = date.getDay()
  return {
    day: date.getDate(),
    week: week === 0 ? 7 : week,
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }
}

// HumanData -> date
export const humanToDate = (humanDate: Omit<HumanDate, 'week'>) => {
  const date = new Date()
  date.setDate(humanDate.day)
  date.setFullYear(humanDate.year)
  date.setMonth(humanDate.month - 1)
  return date
}

// HumanData -> like: 2016-01-02
export const humanDateToYMD = (
  { year, month, day }: Partial<Omit<HumanDate, 'week'>>,
  separator = '-'
) => {
  const _month = month ? separator + String(month).padStart(2, '0') : ''
  const _day = day ? separator + String(day).padStart(2, '0') : ''
  return `${year}${_month}${_day}`
}

export const isSameHumanDay = (target: HumanDate, target2: HumanDate) => {
  return (
    target.day === target2.day && target.month === target2.month && target.year === target2.year
  )
}

// Date -> like: 2016-01-02
export const dateToYMD = (date: Date) => {
  return humanDateToYMD(dateToHuman(date))
}

// YMD (2016-01-02) -> Date
export const ymdToDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return humanToDate({ year, month, day })
}

// Date -> local date string
export const toLocalString = (date: string) => {
  return date ? new Date(date).toLocaleString() : date
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeAgo = (_time: string | number | Date, language: Language) => {
  const time = _time instanceof Date ? _time : new Date(_time)
  const between = Date.now() / 1000 - Number(time) / 1000
  const hourS = 3600
  const dayS = hourS * 24
  const weekS = dayS * 7
  const monthS = dayS * 30
  const yearS = monthS * 12

  const humanText = textHumanizer(language)
  const pluralize = (time: number, label: string) => {
    return `${time} ${label}${humanText(TEXT_MAP.AGO)}`
  }

  if (between < hourS) {
    return ~~(between / 60) === 0
      ? humanText(TEXT_MAP.JUST_NOW)
      : pluralize(~~(between / 60), humanText(TEXT_MAP.MINUTES))
  }
  if (between < dayS) {
    return pluralize(~~(between / hourS), humanText(TEXT_MAP.HOURS))
  }
  if (between < weekS) {
    return pluralize(~~(between / dayS), humanText(TEXT_MAP.DAYS))
  }
  if (between < monthS) {
    return pluralize(~~(between / weekS), humanText(TEXT_MAP.WEEKS))
  }
  if (between < yearS) {
    return pluralize(~~(between / monthS), humanText(TEXT_MAP.MONTHS))
  }
  return pluralize(~~(between / yearS), humanText(TEXT_MAP.YEARS))
}

// Date to YMD am/pm
export const humanizeYMD = (date: string, language: Language) => {
  if (!date) {
    return date
  }
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour =
    newDate.getHours() > 11
      ? textHumanizer(language)(TEXT_MAP.PM)
      : textHumanizer(language)(TEXT_MAP.AM)
  return `${year}/${month}/${day} ${hour}`
}
