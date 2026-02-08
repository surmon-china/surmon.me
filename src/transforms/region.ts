/**
 * @file Region utils
 * @author Surmon <https://github.com/surmon-china>
 */

// https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
// ISO 3166-1 https://en.wikipedia.org/wiki/ISO_3166-1
export const isCNCode = (regionCode: string) => {
  return regionCode === 'CN'
}

export const regionCodeToChineseName = (regionCode: string) => {
  if (regionCode === 'CN') return '中国'
  if (regionCode === 'HK') return '香港'
  if (regionCode === 'MO') return '澳门'
  if (regionCode === 'TW') return '台湾'
  const regionNames = new Intl.DisplayNames(['zh-CN'], { type: 'region' })
  return regionNames.of(regionCode.toUpperCase())
}
