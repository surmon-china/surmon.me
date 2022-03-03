/**
 * @file Validater
 * @module transform.validate
 * @author Surmon <https://github.com/surmon-china>
 */

export const isValidDateParam = (date: string) => {
  const dates = date.split('-')
  // x-x-x
  if (dates.length !== 3) {
    return false
  }
  // 0-0-0
  if (!dates.every((d) => Number.isInteger(Number(d)))) {
    return false
  }
  // 0000-00-00
  const [year, month, day] = dates
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
    return false
  }
  return true
}
